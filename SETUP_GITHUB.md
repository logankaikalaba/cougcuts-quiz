# GitHub Setup - Quick Guide

Your code is committed and ready to push to GitHub. Follow these steps:

## Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `coug-cuts-quiz`
   - **Description**: "Hyperpersonalized hair care quiz for Coug Cuts barbershop"
   - **Visibility**: Private (recommended) or Public
   - **DO NOT** check "Initialize with README" (we already have one)
3. Click "Create repository"

## Step 2: Connect and Push

GitHub will show you commands. Run these in your terminal:

```bash
cd "c:\Users\logan\Downloads\Agentic Workflows V1\hair-quiz"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/coug-cuts-quiz.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 3: Import to Vercel

Once pushed to GitHub:

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select `coug-cuts-quiz`
4. Click "Import"
5. Configure:
   - **Project Name**: `coug-cuts-quiz`
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./`

6. Add Environment Variables (click "Environment Variables"):

```
DATABASE_URL=postgresql://user:password@host:5432/database
RESEND_API_KEY=re_your_key_here
FROM_EMAIL=logan@cougcuts.com
NEXT_PUBLIC_APP_URL=https://quiz.cougcuts.com
NEXT_PUBLIC_BOOKING_URL=https://cougcuts.com/book
```

7. Click "Deploy"

## What's Next?

After deployment:

1. **Set up database**: Create Supabase account and get DATABASE_URL
2. **Set up email**: Create Resend account and get API key
3. **Run migrations**: `npx prisma migrate deploy` with production DATABASE_URL
4. **Set up custom domain**: Add `quiz.cougcuts.com` in Vercel dashboard

See [DEPLOY_TO_COUGCUTS.md](DEPLOY_TO_COUGCUTS.md) for detailed instructions.

---

**Your commit is ready!** 29 files, 9727+ lines of production-ready code.
