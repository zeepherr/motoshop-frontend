# HurngMoto Frontend UI/UX Specification

**Project:** HurngMoto — Motorcycle Repair Shop Management System  
**Document Type:** Approved Frontend / UI / UX Specification  
**Status:** Approved before real UI/UX design  
**Frontend:** React + Vite  
**Backend:** Separate Node.js + Express + Prisma + PostgreSQL API  
**Design Goal:** Modern, responsive, professional, production-style application with strong UX for Admin, Staff, and Member roles.

---

# 1. Frontend Architecture

## 1.1 Framework

Approved stack:

```text
Frontend
→ React + Vite

Backend
→ Node.js + Express + Prisma + PostgreSQL
```

The frontend and backend are separate projects.

```text
HurngMoto/
├── frontend/
└── backend/
```

SEO is not a major requirement. The application should be deployable later.

## 1.2 Public and Authenticated Areas

```text
PUBLIC
├── /
├── /login
├── /register
└── /verify-email

AUTHENTICATED
├── /admin/*
├── /staff/*
└── /member/*
```

The public homepage introduces the shop and provides clear Login / Register actions.

---

# 2. Routing and Navigation

## 2.1 Router

```text
react-router-dom
```

## 2.2 Role-Based Layouts

```text
PublicLayout
├── /
├── /login
├── /register
└── /verify-email

AdminLayout
└── /admin/*

StaffLayout
└── /staff/*

MemberLayout
└── /member/*
```

Frontend role protection improves UX, while backend role authorization remains the security source of truth.

## 2.3 Desktop Sidebar

All authenticated roles use a sidebar.

Approved behavior:
- Collapsible.
- When collapsed, icons remain visible.
- Labels can appear through tooltip/hover.
- Clicking the control expands/collapses it.
- Sidebar state is persisted.

## 2.4 Tablet Navigation

```text
Tablet Portrait
→ collapsed icon sidebar by default

Tablet Landscape
→ collapsible standard sidebar
```

## 2.5 Mobile Navigation

```text
Bottom Navigation
+
More Sheet / Drawer
```

Only the most-used actions are shown in the bottom bar.

### Admin Mobile

```text
Home
POS
Sales
Reports
More
```

### Staff Mobile

```text
Home
POS
Sales
Profile
More
```

### Member Mobile

```text
Home
Motors
History
Profile
More
```

## 2.6 Role Navigation

### Admin

```text
Dashboard
POS
Daily Sales
Products
Categories
Inventory
Motor Brands
Motorcycles
Services
Members / Users
Staff
Reports
Profile
Settings
```

### Staff

```text
Home
POS
Daily Sales
7-Day Performance
Profile
Settings
```

### Member

```text
Home
My Motorcycles
History
Membership
Profile
Settings
```

## 2.7 Login Redirect

```text
ADMIN  → /admin
STAFF  → /staff
MEMBER → /member
```

---

# 3. Visual Design Direction

## 3.1 Overall Style

```text
Professional dashboard
Modern
Premium
Compact
Production-like
```

Reference direction: Stripe-like dashboard structure with modern SaaS styling.

## 3.2 Themes

```text
Light Theme
Dark Theme
```

## 3.3 Dark Theme Palette

```text
Background       #090D18
Surface          #111827
Elevated Surface #171E2E

Primary Blue     #5B8CFF
Primary Purple   #7C5CFC
Accent Purple    #8B5CF6

Text Primary     #F8FAFC
Text Secondary   #94A3B8
Border           #263244
```

Controlled gradient:

```css
linear-gradient(135deg, #5B8CFF, #7C5CFC)
```

Use only for selected accents such as primary CTA, login highlight, selected navigation, membership highlight, and analytics emphasis.

## 3.4 Light Theme Palette

```text
Background       #F6F8FC
Surface          #FFFFFF
Surface Subtle   #F1F5F9

Primary          #5B5FEF
Secondary        #7357E8
Blue Accent      #3B82F6

Text Primary     #111827
Text Secondary   #64748B
Border           #E2E8F0
```

## 3.5 Border Radius

```text
10–14px
```

## 3.6 Density

```text
Compact
```

Admin/Staff are information-dense. Member is slightly more spacious and personal.

---

# 4. UI Component System

## 4.1 Core Stack

```text
Tailwind CSS
+
shadcn/ui
+
Motion
```

## 4.2 Required Components

```text
Button
Input
Select
Combobox
Dialog
Drawer
Sheet
Dropdown
Tooltip
Tabs
Card
Badge
Table
Pagination
Skeleton
Toast
Alert
Command/Search
Date Picker
Form
```

## 4.3 Destructive Actions

Use confirmation dialogs for important/destructive actions.

```text
Deactivate Product?

Michelin City Grip 2 will no longer
be available in POS.

[Cancel]        [Deactivate]
```

## 4.4 Feedback Rules

```text
Normal action
→ Toast

Important/destructive action
→ Dialog

Important success
→ Dedicated success screen/dialog where useful
```

## 4.5 Form Layout

```text
Label above input
```

---

# 5. State Management

## 5.1 State Architecture

```text
Zustand
→ Client / UI state

TanStack Query
→ Server / API state

React local state
→ Small component state
```

## 5.2 Zustand Stores

```text
stores/
├── auth.store.js
├── ui.store.js
└── cart.store.js
```

### auth.store.js

```text
user
accessToken
authInitialized
```

### ui.store.js

```text
theme
sidebarCollapsed
mobileNavigation
```

### cart.store.js

```text
items
customerType
selectedMember
selectedMotor

addItem()
removeItem()
updateQuantity()
clearCart()
```

## 5.3 TanStack Query Data

```text
products
categories
services
motors
motor brands
users
orders
reports
customer analytics
```

Do not duplicate server data inside Zustand.

## 5.4 Persistence

```text
POS cart
→ survives page navigation
→ survives browser refresh

Theme
→ persisted

Sidebar collapsed state
→ persisted
```

## 5.5 Token Storage

```text
Access Token
→ memory / Zustand

Refresh Token
→ HttpOnly Cookie

Theme / Sidebar / Cart
→ localStorage persistence
```

## 5.6 Refresh Restore Flow

```text
Browser Refresh
      ↓
Access token lost from memory
      ↓
POST /auth/refresh
      ↓
New access token
      ↓
GET /auth/me
      ↓
Restore user session
```

## 5.7 Cart Reset Rules

Reset cart on:
- Successful sale
- Logout

Do not reset cart on:
- Page navigation
- Browser refresh

---

# 6. API and Server-State Architecture

## 6.1 HTTP Client

```text
Axios
```

Two clients:

```text
publicApi
authApi
```

### publicApi

```text
register
verify OTP
resend OTP
login
refresh
```

### authApi

```text
products
orders
reports
profile
users
motors
services
etc.
```

## 6.2 Automatic Token Refresh

```text
API Request
    ↓
401
    ↓
Axios interceptor
    ↓
POST /auth/refresh
    ↓
Success?
├── YES → retry original request once
└── NO  → clear auth → /login
```

No infinite retry loop.

## 6.3 Loading UX

```text
Initial page loading
→ Skeleton

Save button
→ Button spinner

Table refetch
→ Subtle loading state

Auth restoring
→ Full-page loader

POS submit
→ Disable Confirm + spinner
```

## 6.4 Mutation Refresh

```text
Mutation success
→ invalidate related TanStack Query keys
→ refetch affected data
```

## 6.5 Error Architecture

```text
Form validation
→ Field error

Normal API error
→ Toast

401
→ silent token refresh

Refresh failed
→ logout + /login

403
→ Permission denied state

404
→ Not-found state

500
→ Friendly error + Retry
```

---

# 7. Forms and Validation UX

## 7.1 Stack

```text
React Hook Form
+
Zod
+
shadcn/ui Form components
```

## 7.2 Validation Timing

```text
First blur / submit
→ show error

After first validation
→ realtime correction feedback
```

## 7.3 Backend Field Errors

Map backend field errors to the related input.

## 7.4 Long Forms

```text
Sectioned single form
```

Example:

```text
Add Product

Basic Information
├── Category
├── SKU
├── Name
└── Description

Pricing
├── Cost Price
└── Selling Price

Inventory
├── Stock Quantity
└── Unit

[Cancel]                  [Save Product]
```

## 7.5 Unsaved Changes Protection

Approved.

```text
You have unsaved changes.

Leave this page without saving?

[Stay]       [Leave]
```

---

# 8. Tables, Search, Filters and Pagination

## 8.1 Desktop Tables

```text
Compact professional table
```

## 8.2 Mobile Data Display

```text
Depends on data
```

Recommended:
- Products → cards / compact list
- Orders → cards / compact list
- Analytics → cards / charts
- Wide/simple data → horizontal scroll only when necessary

## 8.3 Search

```text
Debounced search
≈ 300–500ms
```

## 8.4 Filters

Store filters in URL query params.

```text
/products?search=michelin&category=1&status=active&page=2
```

## 8.5 Pagination

```text
Traditional page numbers
```

Avoid infinite scroll for admin tables.

---

# 9. Dashboard and Analytics UX

## 9.1 Admin Dashboard KPI Cards

```text
Revenue
Orders
Products Sold
Services Sold
Low Stock
Member vs Guest
```

Approved time filters:

```text
Today
Daily
Weekly
Monthly
Custom Range
```

The selected period updates related KPI cards and charts consistently.

## 9.2 Admin Charts

```text
Sales Trend
→ Line Chart

Member vs Guest
→ Donut Chart

Top Products / Services
→ Horizontal Bar Chart
```

## 9.3 Staff Dashboard

Focus on today and the staff member.

```text
Today's Sales
Today's Orders Handled
Today's Revenue Handled
Quick POS Button
Staff Profile / Summary
```

Staff profile/summary can include:
- staff information
- number of orders handled
- recent performance
- related personal performance metrics

## 9.4 Member Dashboard

```text
Profile Summary
Total Spent
Visit Count
10% Member Benefit
My Motorcycles
Recent Service / Orders
```

## 9.5 Dashboard Refresh

```text
Refetch on focus
+
Refetch after relevant mutation
```

---

# 10. POS UX

## 10.1 Desktop POS

Approved 2-panel layout:

```text
┌──────────────────────────────────────────────────────┐
│ POS                                                  │
├──────────────────────────────┬───────────────────────┤
│ Products / Services          │ Cart                  │
│ Search                       │ Customer              │
│ Categories                   │ Items                 │
│ Product cards/list           │ Discount              │
│                              │ Total                 │
│                              │ [Confirm Sale]        │
└──────────────────────────────┴───────────────────────┘
```

## 10.2 Product / Service Selection

```text
[ Products ] [ Services ]
```

## 10.3 Customer Selection

```text
Guest
Member
```

Guest is default.

Member flow:

```text
Select Member
↓
Search member
↓
Show selected member
↓
Automatically apply 10% discount
```

## 10.4 Motorcycle Selection

Optional.

### Member

Select from the user's `USER_MOTOR` list.

### Guest

```text
Select Brand
↓
Select Motor Model
```

from the admin-controlled motor catalog.

## 10.5 Mobile POS

```text
Products
↓
Cart
↓
Customer
↓
Review
↓
Confirm Sale
```

## 10.6 Sticky Mobile Cart

```text
3 items     ฿2,450

[ View Cart ]
```

## 10.7 Stock States

```text
In Stock
12 left

Low Stock
4 left

Out of Stock
Unavailable
```

Out-of-stock items are disabled.

## 10.8 Final Sale Review

```text
Review Sale

Customer       Member: Win Sai
Motorcycle     Honda Click 160
Items          3
Subtotal       ฿2,000
Member 10%    -฿200
Final Total    ฿1,800

[Back]                 [Confirm Sale]
```

## 10.9 Submit UX

```text
Confirm Sale
→ disable button
→ show spinner
→ prevent duplicate submission
```

Success:

```text
✓ Sale Completed

Order HM-00128
Final Total ฿1,755

[New Sale]        [View Order]
```

---

# 11. Authentication UX

## 11.1 Login Layout

```text
Centered card
```

## 11.2 Forgot Password

```text
Later feature
```

Do not show a non-working V1 feature.

## 11.3 Registration Flow

```text
/register
↓
First Name
Last Name
Email
Password
Confirm Password
↓
POST /auth/register
↓
/verify-email
↓
OTP verified
↓
Account created
↓
Success
↓
/login
```

## 11.4 OTP UX

```text
6-digit separated input
Auto-focus next field
Paste full OTP support
Resend cooldown
Token expiry countdown
```

Two timers:

```text
OTP expiry timer
→ Code expires in 04:32

Resend cooldown
→ Resend available in 00:37
```

Expired state:

```text
This verification code has expired.

[ Send a new code ]
```

## 11.5 Session Expiry

```text
Your session has expired.
Please sign in again.
```

Then redirect to `/login`.

---

# 12. Feedback, Empty States and Errors

## 12.1 Toast Position

```text
Desktop
→ top-right

Mobile
→ top area / top-center
```

## 12.2 Empty States

Use helpful explanation + CTA.

```text
No products yet

Start adding products to make
them available in POS.

[ + Add Product ]
```

## 12.3 No Search Results

Separate from empty database state.

```text
No results for "Michelin X"

Try another keyword
or clear your filters.

[ Clear filters ]
```

## 12.4 Error States

### 403

```text
You don't have permission
to access this page.

[Back to Dashboard]
```

### 404

```text
This page doesn't exist.

[Go Home]
```

### 500

```text
Something went wrong.

[Try Again]
```

## 12.5 Important Success States

```text
POS
→ success screen/dialog

Registration
→ success screen/dialog

Normal CRUD
→ toast
```

## 12.6 Notification Center

```text
V1
→ no full notification center

Use:
→ toast
→ badges
→ inline alerts
```

Full notification center is a later/V2 feature.

---

# 13. Responsive Design Rules

## 13.1 Target Sizes

```text
Mobile     ≈ 390px
Tablet     ≈ 768–1024px
Desktop    ≈ 1280–1440px+
```

## 13.2 Responsive Philosophy

Do not simply shrink desktop layouts. Each breakpoint gets intentional UX behavior.

## 13.3 Forms

```text
Desktop
→ 2 columns where useful

Mobile
→ 1 column
```

## 13.4 Dialogs and Sheets

```text
Desktop
→ Dialog / Modal

Mobile
→ Bottom Sheet / Full-screen Sheet
```

## 13.5 Touch Targets

```text
Minimum touch target
≈ 44×44px

Primary button height
≈ 44–48px

Input height
≈ 44–48px
```

## 13.6 Charts

```text
Desktop
→ side-by-side where useful

Mobile
→ stack vertically
→ simplify labels
```

---

# 14. Typography, Icons and Motion

## 14.1 Typography

```text
Primary Font
→ Inter

Fallback
→ system-ui, sans-serif
```

## 14.2 Type Scale

```text
Page Title      28–32px
Section Title   20–24px
Card Title      16–18px
Body            14–16px
Table Text      13–14px
Caption         12–13px
```

## 14.3 Icons

```text
Lucide React
```

## 14.4 Motion Timing

```text
Micro interaction
→ 120–180ms

Sidebar
→ 180–240ms

Dialog / Sheet
→ 180–250ms

Page transition
→ 180–220ms
```

## 14.5 Motion Usage

Use motion for:

```text
Sidebar expand/collapse
Drawer / Sheet
Modal
Dropdown
Tab switch
Button feedback
Success state
Small card entrance
```

Avoid unnecessary animation in tables, forms, and data-heavy areas.

## 14.6 Hover

```text
Card
→ slight border/brightness change

Button
→ subtle light/dark change

Table row
→ soft background highlight
```

## 14.7 Reduced Motion

```text
prefers-reduced-motion
→ reduce/remove non-essential motion
```

---

# 15. Accessibility and Design System Rules

## 15.1 Color Contrast

Use WCAG-friendly contrast in both themes.

## 15.2 Keyboard Navigation

```text
Tab
→ move through controls

Enter / Space
→ activate

Esc
→ close dialog/sheet

Focus
→ visible focus ring
```

## 15.3 Focus States

```text
Default border
↓
Focus
→ blue / purple focus ring
```

## 15.4 Status Must Not Rely on Color Alone

```text
⚠ Low Stock
4 left
```

```text
⛔ Out of Stock
```

## 15.5 Spacing System

```text
4
8
12
16
24
32
48
```

Use consistently across cards, forms, tables, dialogs, drawers, navigation, and sections.

## 15.6 Shared Design System Across Roles

```text
Same:
├── colors
├── typography
├── components
├── spacing
├── motion
└── states

Different:
├── navigation
├── density
├── dashboard content
├── permissions
└── workflows
```

---

# 16. Role Experience Summary

## Admin

Priority:

```text
Control
Analytics
CRUD Management
Operational Visibility
POS
Reports
```

Experience:
- Information-dense
- Compact
- Full navigation
- Fast management access

## Staff

Priority:

```text
POS speed
Today's work
Today's sales
Personal performance
Low distraction
```

Experience:
- Simplified navigation
- Fast POS access
- Today's information first
- No unnecessary admin controls

## Member

Priority:

```text
Personal information
Spending history
Visit history
Motorcycles
Membership benefit
Recent services / orders
```

Experience:
- Cleaner
- More personal
- Less data-dense
- Easy touch interaction

---

# 17. Approved Frontend Technology Stack

```text
React
Vite

react-router-dom

Tailwind CSS
shadcn/ui
Motion

Zustand
TanStack Query
React local state

Axios

React Hook Form
Zod

Lucide React
```

---

# 18. Final UX Principles

1. **Fast before fancy** — especially POS and Staff screens.
2. **Role-aware** — do not show controls users cannot use.
3. **Responsive by design** — do not simply shrink desktop layouts.
4. **Clear feedback** — every action communicates loading, success, error, or disabled state.
5. **Prevent mistakes** — confirm destructive actions and final sales.
6. **Keep data trustworthy** — server state via TanStack Query; important calculations remain backend-driven.
7. **Preserve useful work** — cart survives navigation/refresh; unsaved forms warn before leaving.
8. **Use motion purposefully** — motion supports orientation and feedback, not decoration.
9. **Accessible** — keyboard navigation, focus states, contrast, touch targets, reduced motion.
10. **One product, three experiences** — one design system with different role priorities.

---

# 19. Approved Status Before Real UI/UX Design

```text
✓ Framework
✓ Routing
✓ Role layouts
✓ Navigation behavior
✓ Visual style
✓ Light/Dark themes
✓ Component library
✓ State management
✓ API architecture
✓ Loading architecture
✓ Error architecture
✓ Forms
✓ Validation
✓ Tables
✓ Search
✓ Filters
✓ Pagination
✓ Admin dashboard
✓ Staff dashboard
✓ Member dashboard
✓ Analytics
✓ POS UX
✓ Authentication UX
✓ OTP UX
✓ Feedback states
✓ Empty states
✓ Error states
✓ Responsive rules
✓ Typography
✓ Icons
✓ Motion
✓ Accessibility
✓ Design system rules
```

The project is ready to move into the real UI/UX design phase.

---

**End of HurngMoto Frontend UI/UX Specification**
