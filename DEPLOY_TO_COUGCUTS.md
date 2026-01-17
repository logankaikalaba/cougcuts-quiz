# Deploy Hair Quiz to CougCuts.com

## Quick Start: 3 Steps to Live

### Step 1: Push to GitHub (5 minutes)

```bash
cd hair-quiz

# Run the deploy helper
./deploy.sh

# OR manually:
git init
git add .
git commit -m "Hair quiz MVP ready"
git remote add origin https://github.com/YOUR-USERNAME/coug-cuts-quiz.git
git push -u origin main
```

### Step 2: Deploy to Vercel (10 minutes)

1. **Go to Vercel**: [vercel.com/new](https://vercel.com/new)

2. **Import Repository**:
   - Click "Import Git Repository"
   - Select `coug-cuts-quiz`
   - Click "Import"

3. **Configure Project**:
   - **Project Name**: `coug-cuts-quiz`
   - **Framework**: Next.js ✅ (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (already configured)
   - **Output Directory**: `.next` (auto-detected)

4. **Add Environment Variables**:

   Click "Environment Variables" and add:

   ```bash
   # Database (get from Supabase)
   DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres

   # Email (get from Resend)
   RESEND_API_KEY=re_xxxxxxxxxx
   FROM_EMAIL=logan@cougcuts.com

   # URLs (update after deployment)
   NEXT_PUBLIC_APP_URL=https://quiz.cougcuts.com
   NEXT_PUBLIC_BOOKING_URL=https://cougcuts.com/book
   ```

5. **Click "Deploy"** 🚀

   Wait 2-3 minutes...

6. **You'll get a URL**: `https://coug-cuts-quiz.vercel.app`

### Step 3: Connect Your Domain (10 minutes)

**Option A: Subdomain (Recommended - Easiest)**

1. In Vercel Project → Settings → Domains
2. Add domain: `quiz.cougcuts.com`
3. Vercel shows DNS settings
4. Go to your domain provider (GoDaddy/Namecheap/etc.)
5. Add CNAME record:
   - **Name/Host**: `quiz`
   - **Value/Target**: `cname.vercel-dns.com`
6. Wait 5-30 minutes for DNS propagation
7. Quiz will be live at `https://quiz.cougcuts.com` ✨

**Option B: Use Vercel's Free Domain**

Skip custom domain for now, use:
`https://coug-cuts-quiz.vercel.app`

You can add custom domain later.

---

## Post-Deployment: Set Up Database (5 minutes)

### Get Supabase Database

1. Go to [supabase.com](https://supabase.com/dashboard)
2. Create new project:
   - Name: `hair-quiz-prod`
   - Password: Generate strong password
   - Region: US West (closest to WSU)
3. Wait 2 minutes for setup
4. Go to Settings → Database
5. Copy "Connection String" (URI format)
6. Replace `[YOUR-PASSWORD]` with your password
7. Update in Vercel:
   - Project Settings → Environment Variables
   - Edit `DATABASE_URL`
   - Paste new connection string
   - Redeploy

### Run Database Migration

```bash
# Set your production database URL
export DATABASE_URL="postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres"

# Run migration
npx prisma migrate deploy

# Verify (opens browser interface)
npx prisma studio
```

---

## Set Up Email (5 minutes)

### Get Resend API Key

1. Go to [resend.com/signup](https://resend.com/signup)
2. Verify your email
3. Go to API Keys
4. Create new key: "hair-quiz-production"
5. Copy the key (starts with `re_`)
6. Update in Vercel:
   - Environment Variables → Edit `RESEND_API_KEY`
   - Paste key
   - Redeploy

### Verify Domain (Optional but Recommended)

**For Development**: Use default `onboarding@resend.dev` (100 emails/day)

**For Production**:
1. In Resend → Domains
2. Add domain: `cougcuts.com`
3. Add DNS records shown
4. Wait for verification (5-30 min)
5. Update `FROM_EMAIL` to `logan@cougcuts.com`

---

## Test Everything (5 minutes)

### Test Quiz Flow

1. Visit your deployed URL
2. Click "Get My Free Personalized Routine"
3. Complete quiz with test email
4. Submit

### Verify in Database

1. Open Prisma Studio:
   ```bash
   npx prisma studio
   ```
2. Check `Lead` table for your test submission
3. Verify all fields populated

### Check Email

1. Check inbox for routine email
2. Verify links work
3. Check spam folder if not in inbox

### Test on Mobile

1. Open on phone
2. Complete quiz
3. Verify mobile responsive
4. Check all buttons work

---

## Integrate with Main CougCuts.com Site

### Add Prominent Link/Button

#### Option 1: Add to Navigation

```html
<!-- In your header/navigation -->
<nav>
  <a href="/">Home</a>
  <a href="/services">Services</a>
  <a href="https://quiz.cougcuts.com"
     style="background:#8B0000;color:white;padding:8px 16px;border-radius:20px;">
    Free Hair Quiz
  </a>
  <a href="/book">Book Now</a>
</nav>
```

#### Option 2: Add Hero CTA on Homepage

```html
<!-- Prominent section on homepage -->
<section style="background:linear-gradient(135deg,#8B0000,#6B0000);padding:60px 20px;text-align:center;color:white;">
  <h2 style="font-size:2.5rem;margin-bottom:1rem;">
    Get Your Free Personalized Hair Care Routine
  </h2>
  <p style="font-size:1.25rem;margin-bottom:2rem;">
    Take our 2-minute quiz designed specifically for WSU students
  </p>
  <a href="https://quiz.cougcuts.com"
     style="background:white;color:#8B0000;padding:15px 40px;border-radius:30px;text-decoration:none;font-weight:bold;display:inline-block;">
    Start Free Quiz →
  </a>
</section>
```

#### Option 3: Floating Button (Sticky CTA)

```html
<!-- Sticky button that follows user -->
<a href="https://quiz.cougcuts.com"
   style="position:fixed;bottom:20px;right:20px;background:#8B0000;color:white;padding:15px 25px;border-radius:50px;text-decoration:none;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:1000;">
  📋 Free Hair Quiz
</a>
```

### Update Quiz to Link Back

The quiz already has footer links, but you can customize:

In `hair-quiz/app/quiz/complete/page.tsx`, the "Book Your Cut" button links to:
```typescript
href={process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cougcuts.com/book'}
```

Make sure `NEXT_PUBLIC_BOOKING_URL` in your Vercel environment variables points to your booking page.

---

## Monitoring & Analytics

### View Leads

```bash
# Connect to production database
export DATABASE_URL="your-production-url"
npx prisma studio
```

Opens browser with all your leads, sessions, email events.

### Check Logs

In Vercel Dashboard:
1. Go to your project
2. Click "Deployments"
3. Click latest deployment
4. View "Functions" logs for errors

### Email Delivery

In Resend Dashboard:
1. Go to "Logs"
2. See all sent emails
3. Check delivery rates
4. View bounces/issues

---

## Common Issues & Fixes

### Issue: Quiz loads but email doesn't send

**Fix**:
1. Check Resend API key in Vercel env vars
2. Check logs in Vercel dashboard
3. Verify `FROM_EMAIL` is verified in Resend

### Issue: Database connection error

**Fix**:
1. Verify `DATABASE_URL` is correct
2. Check Supabase project is active
3. Run `npx prisma migrate deploy`

### Issue: 404 on quiz page

**Fix**:
1. Check deployment logs for build errors
2. Verify Next.js build succeeded
3. Clear `.next` cache and redeploy

### Issue: Styles not loading

**Fix**:
1. Tailwind CSS should auto-compile
2. Check `tailwind.config` exists
3. Redeploy to regenerate CSS

---

## Going Live Checklist

Before driving real traffic:

- [ ] Quiz deploys successfully
- [ ] Custom domain works (quiz.cougcuts.com)
- [ ] Database connection works
- [ ] Email delivery works
- [ ] Test submission saves to database
- [ ] Email arrives in inbox (not spam)
- [ ] Links from quiz to booking page work
- [ ] Mobile responsive works
- [ ] Analytics tracking fires
- [ ] Linked from main cougcuts.com site
- [ ] Tested with real email addresses
- [ ] Privacy policy updated (if needed)

---

## Cost Summary

### Current Setup (Free Tier)
- **Vercel**: $0 (Free tier sufficient)
- **Supabase**: $0 (500MB free, plenty for starting)
- **Resend**: $0 (3,000 emails/month free)
- **Domain**: Already own cougcuts.com
- **Total: $0/month** 🎉

### When You Scale (1000+ leads/month)
- **Vercel Pro**: $20/mo (if needed)
- **Supabase Pro**: $25/mo (8GB database)
- **Resend Pro**: $20/mo (50K emails)
- **Total: ~$65/month**

---

## Success! 🎉

Your quiz is now live and capturing leads!

**Next Steps:**
1. Start driving traffic (Instagram, flyers, word of mouth)
2. Monitor leads in Prisma Studio
3. Watch for email delivery
4. Track first booking! 💈

**Your URLs:**
- Quiz: `https://quiz.cougcuts.com`
- Main site: `https://cougcuts.com`
- Database: Supabase Dashboard
- Email logs: Resend Dashboard
- Deployment: Vercel Dashboard

---

## Need Help?

**Quick Checks:**
```bash
# Test database connection
npx prisma db pull

# View logs
vercel logs

# Check environment
vercel env ls
```

**Get Support:**
- Email: logankaikalaba@gmail.com
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support

---

You're all set! Start getting those leads! 🚀💈
