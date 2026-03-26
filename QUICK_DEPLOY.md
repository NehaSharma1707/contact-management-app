# Quick Deployment Commands

Run these commands in order:

## 1. PREPARE BACKEND
```bash
cd server
npm install
npm start
# Test: Visit http://localhost:5000/ 
# Should show "Backend is running"
# Press Ctrl+C to stop
```

## 2. PREPARE FRONTEND
```bash
cd ../client
npm install
npm start
# Test app at http://localhost:3000
# Stop with Ctrl+C
```

## 3. VERIFY .env FILES
```bash
# Backend: server/.env should contain:
MONGO_URI=mongodb+srv://Neha:Neha2026@cluster0.tune7qj.mongodb.net/
PORT=5000

# Frontend: client/.env should contain:
REACT_APP_API_URL=http://localhost:5000/api/contacts
```

## 4. PUSH TO GITHUB
```bash
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
git add .
git commit -m "Production deployment setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/INGLOU_front.git
git push -u origin main
```

## 5. DEPLOY BACKEND TO RENDER
- Go to: https://render.com
- Sign in with GitHub
- Click "New +" → "Web Service"
- Select your `INGLOU_front` repository
- Set **Build Command**: `cd server && npm install`
- Set **Start Command**: `cd server && npm start`
- Add Environment Variables:
  - `MONGO_URI` = `mongodb+srv://Neha:Neha2026@cluster0.tune7qj.mongodb.net/`
  - `PORT` = `5000`
  - `NODE_ENV` = `production`
- Click "Create Web Service"
- Wait 2-3 minutes for deployment
- **COPY YOUR RENDER URL** (e.g., `https://inglou-api.render.com`)

## 6. VERIFY BACKEND
```bash
# Visit in browser:
https://your-render-url.render.com/
# Should show "Backend is running"

# Visit:
https://your-render-url.render.com/api/contacts
# Should show []
```

## 7. DEPLOY FRONTEND TO VERCEL
- Go to: https://vercel.com
- Sign in with GitHub
- Click "Import Project"
- Select your `INGLOU_front` repository
- Set **Root Directory**: `client`
- Set **Build Command**: `npm run build`
- Add Environment Variable:
  - `REACT_APP_API_URL` = `https://your-render-url.render.com/api/contacts`
- Click "Deploy"
- Wait 1-2 minutes for deployment
- **COPY YOUR VERCEL URL** (e.g., `https://inglou-front.vercel.app`)

## 8. TEST YOUR APP
Visit your Vercel URL and test:
- [ ] Can you see the contact form?
- [ ] Can you add a contact?
- [ ] Does it appear in the list?
- [ ] Can you edit it?
- [ ] Can you delete it?
- [ ] Does data persist after refresh?

## DONE! 🎉

Your app is now live!
- Frontend: `https://inglou-front.vercel.app`
- Backend: `https://inglou-api.render.com`
- Database: MongoDB Atlas Cloud

---

## IMPORTANT CREDENTIALS
- MongoDB User: `Neha`
- Password: `Neha2026`
- Cluster: `cluster0.tune7qj.mongodb.net`

⚠️ Keep credentials secure, never commit .env files!
