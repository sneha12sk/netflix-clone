import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';

// Ensure that the `google` variable exists before using it
declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected property name
})
export class LoginComponent implements OnInit {
  // Inject the Angular Router service
  private router = inject(Router);

  ngOnInit(): void {
    // Check if the Google Sign-In library is loaded
    if (typeof google !== 'undefined' && google.accounts) {
      try {
        // Initialize the Google Sign-In client
        google.accounts.id.initialize({
          client_id: '578324229393-v9c8uklrmabjkovjrhb2iqvhpl9tuvj9.apps.googleusercontent.com'
          , // Replace with your actual client ID
          callback: (resp: any) => this.handleLogin(resp), // Handle the login response
        });

        // Render the Google Sign-In button
        const buttonElement = document.getElementById('google-btn');
        if (buttonElement) {
          google.accounts.id.renderButton(buttonElement, {
            theme: 'filled_black',
            size: 'large',
            shape: 'pill',
            width: 350,
          });
        } else {
          console.error('Google Sign-In button element not found in the DOM.');
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    } else {
      console.error('Google Sign-In library is not loaded. Ensure the script is included in index.html.');
    }
  }

  /**
   * Decodes a JWT token to extract its payload.
   * @param token The JWT token as a string.
   * @returns The decoded payload or null if the token is invalid.
   */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)); // Decode the payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  /**
   * Handles the login response from Google.
   * @param response The response object containing the credential.
   */
  handleLogin(response: any): void {
    if (response && response.credential) {
      // Decode the token to extract user information
      const payLoad = this.decodeToken(response.credential);
      if (payLoad) {
        // Store the user information in session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));

        // Navigate to the home or browse page
        this.router.navigate(['home']).catch((error) => {
          console.error('Navigation error:', error);
        });
      } else {
        console.error('Failed to decode the token payload.');
      }
    } else {
      console.error('Invalid login response received.');
    }
  }
}
