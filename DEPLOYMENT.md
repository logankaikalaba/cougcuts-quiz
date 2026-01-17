# Deployment Guide

Step-by-step guide to deploy your hair quiz to production.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (free tier works)
- [ ] Supabase account (free tier)
- [ ] Resend account (free tier: 100 emails/day)
- [ ] Domain for email (optional, can use Resend test domain initially)

## Step 1: Set Up Supabase Database

### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: hair-quiz-production
   - **Database Password**: Generate secure password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes 2-3 minutes)

### Get Connection String

1. Go to Project Settings → Database
2. Scroll to "Connection String" → "URI"
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password
5. Save this - you'll need it for Vercel

**Your connection string should look like:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## Step 2: Set Up Resend Email

### Create Account & API Key

1. Go to [resend.com](https://resend.com)
2. Sign up (free tier: 3000 emails/month)
3. Go to API Keys
4. Click "Create API Key"
5. Name it "hair-quiz-production"
6. Copy the key (starts with `re_...`)

### Domain Setup (Optional but Recommended)

**Option A: Use Test Domain (Quick Start)**
- Resend provides `onboarding@resend.dev`
- Limited to 100 emails/day
- Good for testing

**Option B: Verify Your Domain (Production)**
1. Go to Domains in Resend
2. Click "Add Domain"
3. Enter your domain (e.g., `cougcuts.com`)
4. Add DNS records provided by Resend
5. Wait for verification (5-30 minutes)
6. You can now send from `logan@cougcuts.com`

## Step 3: Push to GitHub

### Initialize Git (if not already done)

```bash
cd hair-quiz
git init
git add .
git commit -m "Initial commit: Hair quiz MVP"
```

### Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `hair-quiz` or `coug-cuts-quiz`
4. Don't initialize with README (you already have one)
5. Click "Create repository"

### Push Code

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push code
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will detect Next.js automatically

### Configure Environment Variables

In the Vercel project settings, add these environment variables:

```bash
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

# Email
RESEND_API_KEY=re_...
FROM_EMAIL=logan@cougcuts.com

# App URLs
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_BOOKING_URL=https://cougcuts.com/book
```

**Important**: For `NEXT_PUBLIC_APP_URL`, use your Vercel deployment URL (you'll get this after first deployment).

### Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Add Build Scripts

Make sure your `package.json` has:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

### Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Get your deployment URL: `https://hair-quiz-xxx.vercel.app`

## Step 5: Run Database Migration

### Option 1: Using Prisma CLI (Recommended)

```bash
# Set environment variable
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"

# Run migration
npx prisma migrate deploy

# Verify
npx prisma studio
```

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run command in Vercel environment
vercel env pull .env.local
npx prisma migrate deploy --preview-feature
```

## Step 6: Test Everything

### Test Landing Page

1. Visit your Vercel URL
2. Click "Get My Free Personalized Routine"
3. Should navigate to `/quiz`

### Test Quiz Flow

1. Answer hair type question (should auto-advance)
2. Complete all questions
3. Submit email
4. Check for errors in Vercel logs

### Test Email Delivery

1. Complete quiz with your email
2. Check inbox (including spam folder)
3. Verify email formatting
4. Click links to ensure they work

### Test Database

1. Go to Supabase → Table Editor
2. Check `Lead` table for your submission
3. Verify all fields populated correctly

## Step 7: Set Up Custom Domain (Optional)

### Add Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `quiz.cougcuts.com`)
3. Add DNS records as instructed
4. Wait for propagation (5-60 minutes)

### Update Environment Variables

Once domain is active, update:

```bash
NEXT_PUBLIC_APP_URL=https://quiz.cougcuts.com
```

Redeploy for changes to take effect.

## Step 8: Monitor & Optimize

### Set Up Error Tracking

Add Sentry (optional but recommended):

```bash
npm install @sentry/nextjs

npx @sentry/wizard -i nextjs
```

### Enable Vercel Analytics

1. Go to Analytics tab in Vercel
2. Enable Web Analytics
3. Deploy to activate

### Monitor Email Delivery

Check Resend dashboard daily for:
- Delivery rates
- Bounce rates
- Open rates (if enabled)

## Troubleshooting

### Build Fails

**Error**: `Prisma Client not generated`
```bash
# Add to package.json scripts
"postinstall": "prisma generate"
```

**Error**: `DATABASE_URL not found`
- Check environment variables in Vercel settings
- Ensure variable names match exactly
- Redeploy after adding variables

### Email Not Sending

**Check**:
1. Resend dashboard for error logs
2. FROM_EMAIL matches verified domain
3. RESEND_API_KEY is correct
4. Check Vercel function logs for errors

### Database Connection Issues

**Check**:
1. DATABASE_URL is correct
2. Supabase project is active
3. Password doesn't have special characters that need escaping
4. Try connection pooling: Add `?pgbouncer=true` to connection string

### 404 on Quiz Page

**Check**:
1. `app/quiz/page.tsx` exists
2. No build errors
3. Clear `.next` cache and rebuild
4. Check Vercel deployment logs

## Production Checklist

Before going live with real traffic:

- [ ] Test complete quiz flow
- [ ] Verify email delivery
- [ ] Check PDF generation (if implemented)
- [ ] Test on mobile devices
- [ ] Verify database connections
- [ ] Check all links work
- [ ] Test with different email providers (Gmail, Outlook, etc.)
- [ ] Review email spam score
- [ ] Set up monitoring/alerts
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Configure rate limiting on API routes
- [ ] Test with real user data
- [ ] Backup database
- [ ] Document any custom configurations

## Scaling Considerations

### When You Outgrow Free Tiers

**Supabase** (Free: 500MB database)
- Upgrade to Pro: $25/month (8GB database)
- Add connection pooler for better performance

**Resend** (Free: 3000 emails/month)
- Pro: $20/month (50K emails)
- Scale as needed

**Vercel** (Free: Plenty for starting)
- Pro: $20/month if you need:
  - More bandwidth
  - Better analytics
  - Team features

### Performance Optimization

When you hit 1000+ users/day:

1. **Add Redis Caching**
   - Cache routine generation results
   - Reduce database queries

2. **Implement CDN**
   - Vercel provides this automatically
   - Add image optimization

3. **Database Optimization**
   - Add indexes (already in schema)
   - Connection pooling
   - Read replicas if needed

## Support

Issues during deployment?

1. Check Vercel deployment logs
2. Check Supabase logs
3. Check Resend delivery logs
4. Email: logankaikalaba@gmail.com

## Next Steps After Deployment

1. **Add Analytics**
   - Google Analytics 4
   - PostHog
   - Mixpanel

2. **Set Up Follow-Up Emails**
   - Day 3 check-in
   - Week 1 discount
   - Month 1 reminder

3. **Build Admin Dashboard**
   - View leads
   - Track conversions
   - Analyze drop-off

4. **Add Testimonials**
   - Request from early users
   - Add to landing page
   - Use in emails

5. **Optimize Conversion**
   - A/B test headlines
   - Test question order
   - Optimize email subject lines

---

You're now live! 🚀

Start driving traffic and watch the leads roll in.
