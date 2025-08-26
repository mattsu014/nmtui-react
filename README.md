# nmtui-react

⚠️ **Work in Progress – Project is not functional yet**

A **minimalist and modern desktop interface**, built with **React.js** and **TypeScript**, to facilitate network connection management using `nmtui`.

`nmtui-react` does **not** replace `NetworkManager` or `nmtui`.  
It simply provides a **clean, responsive, and intuitive UI** to enhance the user experience.

---

## 📷 Screenshots

### Home Screen – Light Theme
![Home light theme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mgkzqrygh044l6z689kh.png)

### Network Connection Screen
![Network connection screen](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1fbxzz961frmygmufnmf.png)

### Settings Screen (Language and Theme)
![Settings screen](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5w46lf1r5i61ehqr7wf.png)

### Home Screen – Alternative Light Theme
![Home light theme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bdna5azsefnq3qr5oxfs.png)

---

## 📖 Project Description

This application is a **visual desktop interface** for network connection management with a **minimalist design**, leveraging **NetworkManager** and VPN technologies.

---

## ✨ Features (Planned & In Development)

### 🔗 Connections
- View available Wi-Fi networks with signal strength indicators  
- Connect/disconnect from networks with password authentication  
- Display real-time connection status  

### ✏️ Edit Connections
- List previously connected Wi-Fi networks  
- Edit saved network settings  
- Option to delete old connections  

### ➕ Add New Connections
- Create new connections manually  
- Support for Wi-Fi, Ethernet, and advanced configurations  

### 🔧 Hostname Management
- Configure device hostname on the network  
- Manage system identification  

### 🛡️ VPN Integration – NordVPN
![NordVPN Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lidqr1141nm6qeqsti3p.png)

Planned VPN features:
- Full VPN interface with server selection  
- Secure connection to different locations  
- Visual VPN connection status in the UI  
- Seamless integration with network manager  

### ⚙️ Customization
- Light/Dark/System themes  
- Multi-language support (English & Portuguese BR)  
- Persistent settings across sessions  

---

## 🛠️ Technologies Used
- [Next.js](https://nextjs.org/)  
- [React.js](https://reactjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Radix UI](https://www.radix-ui.com/)  
- [Tauri](https://tauri.app/)  

---

## 🚀 Development

### Run Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
### Run Desktop App (Tauri + Next.js)
```bash
cargo tauri dev
```