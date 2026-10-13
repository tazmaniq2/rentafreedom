# Rent a Freedom — landing page

A responsive static landing page for a Weinsberg CaraOne 480 QDK (2025) caravan rental business in Bulgaria. Bulgarian is the default language; English can be selected from the header.

## What's included
- Responsive single-page layout
- Bulgarian / English language switch
- Caravan overview and optional equipment cards
- Pickup in Sofia and delivery-by-arrangement messaging
- Enquiry form that prepares an email in the visitor's email app
- No backend, database, build step, or paid hosting required

## Before publishing
1. Open `js/main.js`.
2. Set `CONTACT_EMAIL` to the email address that should receive enquiries.
3. Review all copy, rental terms, accessory compatibility, and specifications.
4. Replace the temporary generic photos with your own caravan and accessory photos when available.
5. Confirm whether the Hapro Traxer 8.6 box is offered with the rental and what vehicle/fitment conditions apply.
6. Add a privacy notice and business contact details before collecting customer information.

## Publish with GitHub Pages
1. Create a GitHub repository named `rentafreedom`.
2. Upload the contents of this folder to the repository root (the `index.html` file must be at the root).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the deployment to finish. The site will be available at `https://YOUR-USERNAME.github.io/rentafreedom/`.

## Image note
The current design uses generic remote images from Unsplash as temporary visual placeholders. They are not photos of the actual Weinsberg caravan. Replace them with properly licensed photos or your own images before launch.

## Form note
The enquiry form does not send data to a server. After `CONTACT_EMAIL` is configured, it opens the visitor's default email app with the enquiry prefilled. A hosted form service can be integrated later if you want submissions without requiring an email app.
