import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with mock data', () => {
    expect(component.contactForm.get('fullName')?.value).toBe('John Doe');
    expect(component.contactForm.get('creditCard')?.value).toBe('4111111111111111');
    expect(component.contactForm.get('message')?.value).toBe(
      'This is a sample message populated from mock data during component initialization.'
    );
    expect(component.isUsingMockData()).toBeTrue();
  });

  describe('Form Validation', () => {
    it('should be valid with initial mock data', () => {
      expect(component.contactForm.valid).toBeTrue();
    });

    it('should be invalid when name is less than 3 characters', () => {
      component.contactForm.get('fullName')?.setValue('Jo');
      expect(component.contactForm.get('fullName')?.valid).toBeFalse();
      expect(component.contactForm.get('fullName')?.errors?.['minlength']).toBeTruthy();
    });

    it('should be invalid when credit card is not a number', () => {
      component.contactForm.get('creditCard')?.setValue('41111111a1111111');
      expect(component.contactForm.get('creditCard')?.valid).toBeFalse();
      expect(component.contactForm.get('creditCard')?.errors?.['pattern']).toBeTruthy();
    });

    it('should be invalid when credit card is too short', () => {
      component.contactForm.get('creditCard')?.setValue('41111');
      expect(component.contactForm.get('creditCard')?.valid).toBeFalse();
      expect(component.contactForm.get('creditCard')?.errors?.['minlength']).toBeTruthy();
    });

    it('should be invalid when message is too short', () => {
      component.contactForm.get('message')?.setValue('Short');
      expect(component.contactForm.get('message')?.valid).toBeFalse();
      expect(component.contactForm.get('message')?.errors?.['minlength']).toBeTruthy();
    });

    it('should validate when all fields are correct', () => {
      component.contactForm.setValue({
        fullName: 'Jane Smith',
        creditCard: '5555555555554444',
        message: 'This is a valid message with sufficient length',
      });

      expect(component.contactForm.valid).toBeTrue();
      expect(component.isUsingMockData()).toBeFalse();
    });
  });

  describe('Credit Card Masking', () => {
    it('should mask credit card correctly', () => {
      const maskedValue = component.maskCreditCard('4111111111111111');
      expect(maskedValue).toBe('4111 **** **** 1111');
    });

    it('should handle shorter credit cards', () => {
      const maskedValue = component.maskCreditCard('411111111111');
      expect(maskedValue).toContain('4111');
      expect(maskedValue).toContain('1111');
      expect(maskedValue).toContain('****');
    });

    it('should return empty string for empty input', () => {
      const maskedValue = component.maskCreditCard('');
      expect(maskedValue).toBe('');
    });

    it('should return full credit card when visibility is true', () => {
      component.isCreditCardVisible = true;
      const fullValue = component.maskCreditCard('4111111111111111');
      expect(fullValue).toBe('4111111111111111');
    });

    it('should return unchanged value for very short inputs', () => {
      const value = '12345';
      const maskedValue = component.maskCreditCard(value);
      expect(maskedValue).toBe(value);
    });

    it('should handle AMEX-length cards (15 digits)', () => {
      const maskedValue = component.maskCreditCard('378282246310005');
      expect(maskedValue).toContain('3782');
      expect(maskedValue).toContain('0005');
      expect(maskedValue.length).toBeGreaterThan(15); // Should include spaces
    });
  });

  describe('Display Credit Card Updates', () => {
    it('should update display credit card when credit card value changes', () => {
      spyOn(component, 'updateDisplayCreditCard');
      component.contactForm.get('creditCard')?.setValue('5555555555554444');
      expect(component.updateDisplayCreditCard).toHaveBeenCalled();
    });

    it('should set displayCreditCard to masked value', () => {
      component.contactForm.get('creditCard')?.setValue('5555555555554444');
      expect(component.displayCreditCard).toBe('5555 **** **** 4444');
    });

    it('should update displayCreditCard when toggling visibility', () => {
      component.toggleCreditCardVisibility();
      expect(component.displayCreditCard).toBe('4111111111111111');
      component.toggleCreditCardVisibility();
      expect(component.displayCreditCard).toBe('4111 **** **** 1111');
    });
  });

  describe('Toggle Credit Card Visibility', () => {
    it('should toggle credit card visibility', () => {
      expect(component.isCreditCardVisible).toBeFalse();
      component.toggleCreditCardVisibility();
      expect(component.isCreditCardVisible).toBeTrue();
      component.toggleCreditCardVisibility();
      expect(component.isCreditCardVisible).toBeFalse();
    });

    it('should update display credit card when toggling visibility', () => {
      spyOn(component, 'updateDisplayCreditCard');
      component.toggleCreditCardVisibility();
      expect(component.updateDisplayCreditCard).toHaveBeenCalled();
    });
  });

  describe('Copy Protection', () => {
    it('should mask credit card for copy operations', () => {
      const maskedForCopy = component.getMaskedCreditCardForCopy('4111111111111111');
      expect(maskedForCopy).toBe('4111********1111');
    });

    it('should handle copy event and prevent default', () => {
      const mockEvent = jasmine.createSpyObj('ClipboardEvent', ['preventDefault']);

      const clipboardDataSpy = jasmine.createSpyObj('DataTransfer', ['setData']);
      Object.defineProperty(mockEvent, 'clipboardData', {
        value: clipboardDataSpy,
      });

      component.onCopyCreditCard(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should set masked data to clipboard', () => {
      const mockEvent = jasmine.createSpyObj('ClipboardEvent', ['preventDefault']);

      const clipboardDataSpy = jasmine.createSpyObj('DataTransfer', ['setData']);
      Object.defineProperty(mockEvent, 'clipboardData', {
        value: clipboardDataSpy,
      });

      component.onCopyCreditCard(mockEvent);
      expect(clipboardDataSpy.setData).toHaveBeenCalledWith('text/plain', '4111********1111');
    });

    it('should use fallback copy method when clipboardData is not available', () => {
      const mockEvent = jasmine.createSpyObj('ClipboardEvent', ['preventDefault']);

      spyOn(component, 'copyToClipboardFallback');

      component.onCopyCreditCard(mockEvent);
      expect(component.copyToClipboardFallback).toHaveBeenCalledWith('4111********1111');
    });

    it('should correctly implement the clipboard fallback method', () => {
      // Mock document methods
      const mockTextArea = document.createElement('textarea');

      // Create spies for the methods we need to track
      spyOn(document, 'createElement').and.returnValue(mockTextArea);
      spyOn(mockTextArea, 'focus');
      spyOn(mockTextArea, 'select');
      spyOn(document.body, 'appendChild');
      spyOn(document.body, 'removeChild');
      spyOn(document, 'execCommand').and.returnValue(true);

      // Call the fallback method
      component.copyToClipboardFallback('test-value');

      // Verify the mocked methods were called correctly
      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(mockTextArea.value).toBe('test-value');
      expect(document.body.appendChild).toHaveBeenCalledWith(mockTextArea);
      expect(mockTextArea.focus).toHaveBeenCalled();
      expect(mockTextArea.select).toHaveBeenCalled();
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(document.body.removeChild).toHaveBeenCalledWith(mockTextArea);
    });
  });

  describe('Form Submission', () => {
    it('should log form data when valid form is submitted', () => {
      spyOn(console, 'log');
      component.onSubmit();
      expect(console.log).toHaveBeenCalledWith(
        'Form submitted with unmasked credit card:',
        '4111111111111111'
      );
    });

    it('should reset form after submission', () => {
      spyOn(component.contactForm, 'reset');
      component.onSubmit();
      expect(component.contactForm.reset).toHaveBeenCalled();
    });

    it('should mark fields as touched when invalid form is submitted', () => {
      component.contactForm.get('fullName')?.setValue('');
      component.contactForm.get('fullName')?.markAsUntouched();

      component.onSubmit();

      expect(component.contactForm.get('fullName')?.touched).toBeTrue();
    });

    it('should not reset form when invalid', () => {
      component.contactForm.get('fullName')?.setValue('');
      spyOn(component.contactForm, 'reset');

      component.onSubmit();

      expect(component.contactForm.reset).not.toHaveBeenCalled();
    });
  });

  describe('Mock Data Detection', () => {
    it('should correctly identify when using mock data', () => {
      expect(component.isUsingMockData()).toBeTrue();

      component.contactForm.get('fullName')?.setValue('Different Name');
      expect(component.isUsingMockData()).toBeFalse();

      component.contactForm.patchValue(component.mockData);
      expect(component.isUsingMockData()).toBeTrue();
    });
  });
});
