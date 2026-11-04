# The Send Club Offroading — Netlify Website

A responsive, static website for The Send Club Offroading. It includes editable events, video/podcast links, a photo gallery, social links, founder information, and a Netlify contact form.

## Deploy to Netlify

1. Extract this ZIP.
2. Create a GitHub repository and upload **all files and folders** from this project.
3. In Netlify, choose **Add new site → Import an existing project** and connect that GitHub repository.
4. Use the default build settings. Publish directory is `.` and there is no build command.
5. Deploy the site.

## Turn on the editable dashboard

The admin area is at `https://YOUR-SITE.netlify.app/admin/`.

This project uses Decap CMS with Netlify Identity and Git Gateway. The admin page includes the Netlify Identity widget required to process invitation links; without that widget, an invitation can land on the normal site without showing the password-creation screen:

1. In your Netlify site dashboard, open **Integrations** or **Identity** and enable Netlify Identity if it is available for your site.
2. Enable **Git Gateway** for the site.
3. Invite yourself as an Identity user and accept the invitation. The `/admin/` page now loads the Netlify Identity widget before Decap CMS and opens the signup flow when it detects an invitation or password-recovery token.
4. Open the invitation link again and finish creating your password. Then sign in at `/admin/`.

Netlify's Identity/Git Gateway availability and setup can vary for newer sites. If those options are not available in your Netlify dashboard, use a supported Decap CMS authentication provider or GitHub backend before relying on the admin editor.

## What can be edited

- **Events:** create an event by typing the details, uploading a flyer, or doing both. Flyer uploads appear on the public event card. You can also edit, unpublish, or delete events later.
- **Videos & Podcast:** titles, types, descriptions, URLs, thumbnails, and published status.
- **Photo Gallery:** upload photos and add captions.
- **Website Settings:** homepage intro and YouTube, Instagram, Facebook, TikTok, and podcast links.

Edits are saved to the connected Git repository and Netlify redeploys the site.

## Managing events without coding

1. Open `https://YOUR-SITE.netlify.app/admin/` and sign in.
2. Choose **Events → Upcoming Events → New Upcoming Events** (the exact button wording may vary).
3. To type an event, fill in the title, date, time, location, and description.
4. To use a flyer, choose **Event flyer → Choose an image** and upload it. You can leave the typed details blank if the flyer contains everything.
5. Save and publish. Netlify will deploy the updated event list.

You can return to the same dashboard whenever details change. Uploaded flyers are stored with the site in the `uploads` folder.

## Contact form

The Join the Club form uses Netlify Forms. After the first deploy, check **Forms** in the Netlify dashboard to confirm form detection and configure email notifications.

## Before launch

- Add the group's real YouTube, Instagram, Facebook, TikTok, and podcast URLs in `/admin/`.
- Add your first events and content links in `/admin/`. For an event, choose **New Event**; type in the information, upload a flyer in the **Event flyer** field, or do both. The flyer accepts common image formats such as JPG and PNG. You do not need to edit any code.
- Upload real riding photos to the gallery.
- Replace or expand the founder descriptions if you want additional details.
- Add a custom domain in Netlify when ready.

## Local preview

You can preview the site with any static local server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
