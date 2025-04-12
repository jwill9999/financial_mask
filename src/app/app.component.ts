import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Component for secure credit card handling with PCI DSS compliance
  title = 'angular-app';
  contactForm!: FormGroup;
  isCreditCardVisible = false;
  displayCreditCard = '';

  // Mock data object
  mockData = {
    fullName: 'John Doe',
    creditCard: '4111111111111111',
    message: 'This is a sample message populated from mock data during component initialization.',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    // Populate form with mock data
    this.contactForm.patchValue(this.mockData);
    // Initialize masked credit card display
    this.updateDisplayCreditCard();

    // Subscribe to credit card changes to update masked display
    this.contactForm.get('creditCard')?.valueChanges.subscribe(() => {
      this.updateDisplayCreditCard();
    });
  }

  initForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      creditCard: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(13),
          Validators.maxLength(19),
        ],
      ],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Get the form values including the unmasked credit card
      const formData = this.contactForm.value;

      // Log to show the unmasked credit card is being submitted
      console.log('Form submitted with unmasked credit card:', formData.creditCard);
      console.log('Complete form data:', formData);

      // Here you would typically send the form data to a service
      // const response = this.apiService.submitContactForm(formData);

      this.contactForm.reset();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  updateDisplayCreditCard() {
    const creditCard = this.contactForm.get('creditCard')?.value;
    this.displayCreditCard = this.maskCreditCard(creditCard);
  }

  // Toggle credit card visibility
  toggleCreditCardVisibility(): void {
    this.isCreditCardVisible = !this.isCreditCardVisible;
    this.updateDisplayCreditCard();
  }

  // Mask credit card to show first 4 and last 4 digits (PCI DSS compliant)
  maskCreditCard(creditCard: string): string {
    if (!creditCard) return '';
    if (this.isCreditCardVisible) return creditCard;

    if (creditCard.length <= 8) return creditCard;

    const firstFour = creditCard.substring(0, 4);
    const lastFour = creditCard.substring(creditCard.length - 4);
    const middleLength = creditCard.length - 8;
    const maskedPart = '*'.repeat(middleLength);

    // Format like 4111 **** **** 1234
    let formattedCard = '';
    if (creditCard.length >= 16) {
      // Standard 16-digit card
      formattedCard = `${firstFour} ${maskedPart.substring(0, 4)} ${maskedPart.substring(4, 8)} ${lastFour}`;
    } else if (creditCard.length >= 13) {
      // Handle shorter cards (like some AMEX or old cards)
      const remaining = maskedPart.length % 4;
      formattedCard = `${firstFour} ${maskedPart.substring(0, remaining)}`;

      for (let i = remaining; i < maskedPart.length; i += 4) {
        formattedCard += ` ${maskedPart.substring(i, i + 4)}`;
      }

      formattedCard += ` ${lastFour}`;
    } else {
      // Very short cards (unlikely but handling edge case)
      formattedCard = `${firstFour} ${maskedPart} ${lastFour}`;
    }

    return formattedCard;
  }

  // Handle copy event to ensure only masked version is copied
  onCopyCreditCard(event: ClipboardEvent): void {
    event.preventDefault();
    const creditCard = this.contactForm.get('creditCard')?.value;
    if (creditCard) {
      const maskedCreditCard = this.getMaskedCreditCardForCopy(creditCard);

      // Copy the masked version to clipboard
      if (event.clipboardData) {
        event.clipboardData.setData('text/plain', maskedCreditCard);
      } else {
        // Fallback for browsers that don't support clipboardData
        this.copyToClipboardFallback(maskedCreditCard);
      }
    }
  }

  // Always return masked version for copying, even when displayed in full
  getMaskedCreditCardForCopy(creditCard: string): string {
    if (creditCard.length <= 8) return creditCard;

    const firstFour = creditCard.substring(0, 4);
    const lastFour = creditCard.substring(creditCard.length - 4);
    return `${firstFour}********${lastFour}`;
  }

  // Fallback copy method for browsers that don't support clipboardData
  copyToClipboardFallback(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    document.body.removeChild(textArea);
  }

  // Helper method to check if current form values match the mock data
  isUsingMockData(): boolean {
    const formValue = this.contactForm.value;
    return (
      formValue.fullName === this.mockData.fullName &&
      formValue.creditCard === this.mockData.creditCard &&
      formValue.message === this.mockData.message
    );
  }
}
