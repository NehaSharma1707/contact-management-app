# End-to-End Deployment Guide

This guide covers deploying your INGLOU Contact Management Application to:
- **Backend**: Render.com
- **Frontend**: Vercel.com
- **Database**: MongoDB Atlas (existing cluster)

---

## Prerequisites

1. **GitHub Account** - For version control
2. **MongoDB Atlas Account** - Already set up with credentials:
   - Username: `Neha`
   - Password: `Neha2026`
   - Cluster: `cluster0.tune7qj.mongodb.net`
3. **Render Account** - Free tier available at render.com
4. **Vercel Account** - Free tier available at vercel.com

---

## Step 1: Prepare Local Environment

### 1.1 Update Backend Dependencies

```bash
cd server
npm install
```

### 1.2 Create .env file in server directory

```bash
cd server
echo MONGO_URI=mongodb+srv://Neha:Neha2026@cluster0.tune7qj.mongodb.net/ > .env
echo PORT=5000 >> .env
```

### 1.3 Test Backend Locally

```bash
cd server
npm start
```

You should see:
```
MongoDB connected
Server running on port 5000
```

Press `Ctrl+C` to stop.

### 1.4 Test Frontend Locally

```bash
cd client
npm start
```

The app should open at http://localhost:3000. Test creating, reading, updating, and deleting contacts.

---

## Step 2: Push Code to GitHub

### 2.1 Initialize/Update Git Repository

```bash
# In root directory (INGLOU_front)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2.2 Add and Commit Changes

```bash
git add .
git commit -m "Prepare for production deployment with MongoDB and environment variables"
```

### 2.3 Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/INGLOU_front.git
git push -u origin main
```

If the repository already exists:
```bash
git push origin main
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account & Connect GitHub

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "Connect GitHub account" and authorize

### 3.2 Create New Web Service

1. Click "New +" → "Web Service"
2. Select your repository: `INGLOU_front`
3. Fill in the details:
   - **Name**: `inglou-api` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: ``cd server && npm start``
   - **Root Directory**: Leave empty (Render will auto-detect)

### 3.3 Set Environment Variables

1. Scroll down to "Environment Variables"
2. Click "Add Environment Variable"
3. Add the following:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://Neha:Neha2026@cluster0.tune7qj.mongodb.net/` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

4. Click "Create Web Service"

### 3.4 Wait for Deployment

- Render will build and deploy your backend
- You'll see logs in the dashboard
- Once deployed, you'll get a URL like: `https://inglou-api.render.com`
- **Save this URL** - you'll need it for the frontend

### 3.5 Verify Backend is Working

Visit: `https://inglou-api.render.com/`

You should see: "Backend is running"

Test the API:
Visit: `https://inglou-api.render.com/api/contacts`

You should get: `[]` (empty array)

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account & Connect GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"

### 4.2 Import from GitHub

1. Select your repository: `INGLOU_front`
2. Configure the project:
   - **Framework Preset**: React
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 4.3 Set Environment Variables

1. Scroll to "Environment Variables"
2. Add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://inglou-api.render.com/api/contacts` |

(Replace `inglou-api.render.com` with your actual Render URL)

3. Click "Deploy"

### 4.4 Wait for Deployment

- Vercel will build and deploy your frontend
- You'll get a URL like: `https://inglou-front.vercel.app`
- This is your live application

### 4.5 Verify Frontend is Working

Visit your Vercel URL and test:
- ✅ Can see the Contact Management form
- ✅ Can add a new contact
- ✅ Contact appears in the list
- ✅ Can edit contacts
- ✅ Can delete contacts
- ✅ Data persists on page refresh

---

## Step 5: Update Frontend Environment Variables (If Needed)

If you need to update the API URL after deployment:

### Option A: Direct Update in Vercel

1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Update `REACT_APP_API_URL` value
5. Redeploy (just push a commit to GitHub or use "Redeploy" button)

### Option B: Update Locally and Push

```bash
# In client/.env
REACT_APP_API_URL=https://your-render-url.render.com/api/contacts

# Commit and push
git add .
git commit -m "Update API URL for production"
git push origin main

# Vercel auto-deploys on push
```

---

## Troubleshooting

### Backend won't connect to MongoDB

Check Render logs:
1. Go to Render dashboard → Select your service
2. Click "Logs"
3. Look for error messages
4. Verify MONGO_URI environment variable is correct

### Frontend can't reach backend (CORS error)

1. Verify the `REACT_APP_API_URL` is correct
2. Ensure backend CORS is enabled (it is by default)
3. Check that backend URL includes `/api/contacts` at the end
4. Redeploy frontend after updating URL

### Contacts not saving

1. Check MongoDB Atlas connection
2. Verify the database exists: `cluster0.tune7qj.mongodb.net/contacts` (or just the root)
3. Check Render logs for database errors
4. Verify `.env` file has correct MongoDB credentials

---

## Important Commands Reference

### Local Development

```bash
# Start backend
cd server && npm start

# Start frontend (new terminal)
cd client && npm start

# Test API
curl http://localhost:5000/api/contacts
```

### Deployment

```bash
# Update code
git add .
git commit -m "Your message"
git push origin main

# Monitor Render
# Go to https://dashboard.render.com/

# Monitor Vercel  
# Go to https://vercel.com/dashboard/

# Check logs
# Render: Dashboard → Service → Logs
# Vercel: Dashboard → Project → Deployments → View logs
```

---

## Security Notes

- ⚠️ Never commit `.env` files with real credentials
- ✅ Use `.env.example` files as templates
- ✅ Store sensitive credentials in deployment platform environment variables only
- ✅ Render and Vercel provide free SSL/TLS (encrypted connections)

---

## Success Checklist

- [ ] Backend deployed to Render and showing "Backend is running"
- [ ] Frontend deployed to Vercel and accessible
- [ ] Frontend can fetch contacts from backend API
- [ ] Can create new contact and it saves to MongoDB
- [ ] Can view all contacts
- [ ] Can update a contact
- [ ] Can delete a contact
- [ ] Data persists after page refresh
- [ ] No console errors in browser

---

## Next Steps (Optional Improvements)

1. Add contact search functionality
2. Add contact filtering
3. Add form validation
4. Add loading states
5. Add error notifications
6. Add pagination for many contacts
7. Add user authentication
8. Add contact categories/tags
