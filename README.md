# Invoice App

### Table of Contents

- [Prerequisites](#Prerequisites)
- [Tech Stack](#Tech-Stack)
- [Interaction](#Interaction)
- [Screenshot](#Screenshot)
- [Links](#Links)
- [Getting Started](#Getting-Started)
- [Deployment](#Deployment)
- [Structure](#Structure)
- [Author](#Author)

### Prerequisites

- <img src="client/public/readme/npm.png" width="25" style="top: 8px" /> _npm: Node Package Manager for JavaScript_
- <img src="client/public/readme/vite.jpg" width="25" style="top: 8px" /> _Vite: Frontend build tool for modern web development_
- <img src="client/public/readme/ts.png" width="25" style="top: 8px" /> _TypeScript: Typed superset of JavaScript._

#

### Tech Stack

- <img src="client/public/readme/next-js.png" width="25" style="top: 8px" /> _Next.js: React framework for server-side rendering, automatic code splitting, and easy deployment_
- <img src="client/public/readme/tailwind-css.png" width="25" style="top: 8px" /> _Tailwind CSS: Utility-first CSS framework for rapid UI development._
- <img src="client/public/readme/mongoose.png" width="25" style="top: 8px" /> _Mongoose: MongoDB object modeling for Node.js._
- <img src="client/public/readme/motion.png" width="25" style="top: 8px" /> Framer Motion: React animation library for smooth, high-performance UI transitions.

### Interaction

Users able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- Keep track of any changes, even after refreshing the browser

### Screenshot

![](./public/preview.jpg)

### Links

- Solution URL: [Add solution URL here](https://github.com/DavitDvalashvili/invoice-app)
- Live Site URL: [Add live site URL here](https://invoice-app-kohl-sigma.vercel.app)

### Getting Started

1. First of all you need to clone app repository from github:

```
git clone https://github.com/DavitDvalashvili/todo-mern-app.git
```

2. Next step requires install all the dependencies.

```
npm install
```

3. To see project in action

```
npm run dev
```

### Deployment

Before every deployment you need to create build file.

```
npm run build
```

after this you can use this file to deploy project on server.

## Structure

```
├── app/
│ ├── api/
│ │ ├── invoice/
│ │ │ └── [id]/
│ │ │ └── route.tsx
│ │ ├── invoices/
│ │ │ └── [status]/
│ │ │ └── route.tsx
│ ├── invoices/
│ │ ├── page.tsx
│ │ ├── [invoiceID]/
│ │ │ └── page.tsx
│ ├── layout.tsx
│ ├── not-found.tsx
│ └── page.tsx
├── components/
│ ├── common/
│ │ ├── ConfirmDelete.tsx
│ │ ├── CustomCheckbox.tsx
│ │ ├── CustomDatePicker.tsx
│ │ ├── CustomSelect.tsx
│ │ ├── FilterBox.tsx
│ │ ├── InputBox.tsx
│ │ └── Loader.tsx
│ ├── layout/
│ │ └── Header.tsx
│ ├── invoice/
│ │ ├── Invoice.tsx
│ │ └── InvoiceDetails.tsx
├── config/
│ └── db.ts
├── hooks/
│ └── useWindowWidth.ts
├── models/
│ └── invoice.model.ts
├── public/
│ └── readme
├── styles/
│ └── global.css
├── types/
│ └── types.ts
├── utils/
│ └── numberGenerator.ts
├── .gitignore
├── next.config.js
├── package.json
└── README.md

```

### Author

- Github profile - [Add your name here](https://github.com/DavitDvalashvili)
- Linkedin profile - [Add your name here](https://www.linkedin.com/in/davit-dvalashvili-0421b6253)
- Email - [@your_username](davitdvalashvili1996@gmail.com)
