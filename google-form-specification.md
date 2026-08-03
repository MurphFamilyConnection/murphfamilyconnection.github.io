# Family Tree Information — Google Form Specification

This document specifies the Google Form embedded on `family-tree-information.html`.
It is based on the approved genealogy card, with the approved contact-information
improvements. Build this form manually in Google Forms (Google Forms cannot be
created through this site) — see **How to Build This Form** below.

## Form Title

**Murph Family Tree Information**

## Form Description

> Help us strengthen and expand the Murph Family Tree by sharing information about
> your direct Murph bloodline. The information collected will help connect Murph
> family branches and preserve our shared history for future generations.
>
> Please provide information only for your direct Murph ancestral line. Do not
> include spouses or relatives who married into the Murph family.

## Sections and Fields

### 1. Contact Information

| Field | Type | Required | Notes |
|---|---|---|---|
| First Name | Short answer | Yes | |
| Last Name | Short answer | Yes | |
| Email Address | Short answer | Yes | Set response validation to "Email" |
| Cell No. | Short answer | No | |

### 2. Murph Direct Bloodline Ancestors

Section description: *List names as best known. Leave any field blank if unknown.*

> **Order note:** Mother appears before Father in this list — this order is
> approved and should not be reversed.

| Field | Type | Required |
|---|---|---|
| Great-Great Grandfather | Short answer | No |
| Great-Great Grandmother | Short answer | No |
| Great-Grandfather | Short answer | No |
| Great-Grandmother | Short answer | No |
| Grandfather | Short answer | No |
| Grandmother | Short answer | No |
| Mother | Short answer | No |
| Father | Short answer | No |

### 3. Family Information

| Field | Type | Required | Notes |
|---|---|---|---|
| Family Branch / Tree (Descendant of) | Short answer | No | e.g. name of the branch or earliest known ancestor |
| Comments | Paragraph | No | |

### 4. Permission

| Field | Type | Required | Options |
|---|---|---|---|
| Permission to Use Information | Checkboxes | **Yes** | ☐ I understand that the information I provide may be used by the Murph Family Connection to help develop, preserve, and expand our family tree and related family history records. |

In Google Forms, use the **Checkboxes** question type with this single option, and
turn on **Required**. This prevents submission until the box is checked.

## Confirmation Message

Set this under **Settings → Presentation → Confirmation message**:

> Thank you for contributing to the Murph Family Connection. Your information
> helps strengthen and preserve our shared family history for future generations.

## Recommended Form Settings

- **Settings → Responses**: Collect email addresses = Off (email is already asked
  as a form field above); Limit to 1 response = Off (so one person can submit
  for multiple ancestral lines if needed).
- **Settings → Presentation**: Show progress bar = optional; Shuffle question
  order = Off.
- **Settings → Defaults**: Not required, by default, for each new question, so
  remember to mark the four required fields above (First Name, Last Name,
  Email Address, Permission checkbox) as Required individually.

## How to Build This Form

1. Sign in to the Google account that will own the form (see note below on
   development vs. official accounts).
2. Go to [forms.google.com](https://forms.google.com) and create a **Blank form**.
3. Set the form title and description as specified above.
4. Add each field in the order listed, using the question types noted.
5. Mark First Name, Last Name, Email Address, and the Permission checkbox as
   **Required** (toggle in the bottom-right of each question).
6. Set the email validation on the Email Address field (⋮ menu → Response
   validation → Text → Email).
7. Set the confirmation message (Settings → Presentation).
8. Click **Send**, choose the **`<>`** (embed) tab, and copy the URL inside
   `src="..."` — it ends in `?embedded=true`.
9. Paste that URL into the `googleFormEmbedUrl` value in
   `assets/js/modules/config.js` (see the comment at the top of that file).
   This is the only place that needs to change.

## Development vs. Official Form

Per the approved scope, this form may be built under a personal Google account
for development. Once approved, recreate the same form under the official
Murph Family Connection Google account and update `googleFormEmbedUrl` in
`assets/js/modules/config.js` with the new embed URL — no other file changes
are needed.
