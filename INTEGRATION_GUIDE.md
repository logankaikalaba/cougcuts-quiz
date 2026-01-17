# Integration Guide: Adding Quiz to CougCuts.com

This guide covers integrating the hair quiz into your existing cougcuts.com website.

## Option 1: Deploy as Separate Vercel Project (Recommended - Easiest)

This approach deploys the quiz as its own project and links it from your main site.

### Step 1: Deploy Quiz to Vercel

```bash
cd hair-quiz

# Initialize git if not already done
git init
git add .
git commit -m "Hair quiz MVP complete"

# Push to GitHub
gh repo create coug-cuts-quiz --public --source=. --remote=origin --push
# OR manually create repo on GitHub and:
git remote add origin https://github.com/YOUR-USERNAME/coug-cuts-quiz.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `coug-cuts-quiz` repository
3. Configure:
   - **Project Name**: `coug-cuts-quiz`
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Environment Variables**: Add all from `.env`

### Step 3: Set Up Custom Domain

**Option A: Subdomain (Recommended)**

1. In Vercel project settings → Domains
2. Add domain: `quiz.cougcuts.com`
3. Vercel will show DNS settings
4. In your domain provider (GoDaddy, Namecheap, etc.):
   - Add CNAME record:
     - Name: `quiz`
     - Value: `cname.vercel-dns.com`
5. Wait 5-60 minutes for DNS propagation

**Option B: Subdirectory Path**

1. Add domain: `cougcuts.com/quiz`
2. Configure redirect/proxy rules (see Option 2 below)

### Step 4: Link from Main Site

Add a prominent button/link on cougcuts.com:

```html
<!-- Prominent CTA on homepage -->
<a href="https://quiz.cougcuts.com"
   class="btn-primary">
  Get Your Free Hair Care Routine
</a>

<!-- Or as a button in navigation -->
<nav>
  <a href="/">Home</a>
  <a href="/services">Services</a>
  <a href="https://quiz.cougcuts.com" class="highlight">Free Quiz</a>
  <a href="/book">Book Now</a>
</nav>
```

**✅ Advantages:**
- Easiest to set up
- Independent deployment
- No conflicts with existing site
- Can update quiz without touching main site

**❌ Disadvantages:**
- Separate domain/subdomain
- Slightly less SEO benefit

---

## Option 2: Integrate Into Existing Next.js Site

If your current cougcuts.com is also built with Next.js, you can merge the projects.

### Step 1: Copy Files to Existing Project

Assuming your existing site is at `/path/to/cougcuts-website`:

```bash
# From the hair-quiz directory

# Copy app routes
cp -r app/quiz /path/to/cougcuts-website/app/
cp -r app/api/quiz /path/to/cougcuts-website/app/api/
cp -r app/api/analytics /path/to/cougcuts-website/app/api/

# Copy components
cp -r components/quiz /path/to/cougcuts-website/components/

# Copy data
cp -r data /path/to/cougcuts-website/

# Copy lib files
cp lib/routine-generator.ts /path/to/cougcuts-website/lib/
cp lib/email.ts /path/to/cougcuts-website/lib/
cp lib/pdf-generator.ts /path/to/cougcuts-website/lib/

# Copy/merge Prisma schema
# CAREFUL: Merge this with your existing schema
cp prisma/schema.prisma /path/to/cougcuts-website/prisma/schema-quiz.prisma
# Then manually merge into your main schema.prisma
```

### Step 2: Update Your Homepage

Add quiz CTA to your existing homepage:

```tsx
// In your existing app/page.tsx, add:

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Your existing homepage content */}

      {/* Add prominent quiz CTA section */}
      <section className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] py-20">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Get Your Free Personalized Hair Care Routine
          </h2>
          <p className="text-xl mb-8">
            Take our 2-minute quiz and get a custom routine for YOUR hair
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-[#8B0000] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Start Free Quiz →
          </Link>
        </div>
      </section>

      {/* Rest of your homepage */}
    </div>
  );
}
```

### Step 3: Install Dependencies

Add quiz dependencies to your existing project:

```bash
cd /path/to/cougcuts-website

npm install framer-motion react-hook-form @hookform/resolvers zod @react-email/components react-email resend @react-pdf/renderer
```

### Step 4: Update Environment Variables

Add to your existing `.env`:

```bash
# Add these quiz-specific variables
RESEND_API_KEY="re_..."
FROM_EMAIL="logan@cougcuts.com"
```

### Step 5: Run Database Migration

```bash
# Generate Prisma client with new models
npx prisma generate

# Create migration
npx prisma migrate dev --name add_quiz_models
```

### Step 6: Deploy

```bash
git add .
git commit -m "Add hair care quiz"
git push
```

Vercel will auto-deploy the updated site.

**✅ Advantages:**
- Everything in one project
- Same domain (cougcuts.com/quiz)
- Better SEO
- Shared navigation/branding

**❌ Disadvantages:**
- More complex merge
- Need to be careful with existing code
- Potential dependency conflicts

---

## Option 3: WordPress/CMS Integration

If your current site is WordPress, Wix, Squarespace, etc.

### Deploy Quiz Separately (Same as Option 1)

1. Deploy quiz to Vercel at `quiz.cougcuts.com`
2. Set up database and email

### Link from Main Site

**Method A: Direct Link**

Add button to your WordPress/CMS homepage:

```html
<a href="https://quiz.cougcuts.com"
   style="background: #8B0000; color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; display: inline-block;">
  Get Your Free Hair Routine
</a>
```

**Method B: Iframe Embed** (Not recommended but possible)

```html
<iframe
  src="https://quiz.cougcuts.com"
  width="100%"
  height="800px"
  frameborder="0">
</iframe>
```

**Method C: Modal/Popup**

Use a popup that opens quiz.cougcuts.com in modal:

```html
<button onclick="openQuizModal()">Start Quiz</button>

<script>
function openQuizModal() {
  window.open('https://quiz.cougcuts.com', 'quiz', 'width=800,height=600');
}
</script>
```

---

## Option 4: Path-Based Routing (Advanced)

Make quiz appear at `cougcuts.com/quiz` even if main site isn't Next.js.

### Use Vercel Rewrites

In your main site's `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/quiz/:path*",
      "destination": "https://coug-cuts-quiz.vercel.app/:path*"
    },
    {
      "source": "/api/quiz/:path*",
      "destination": "https://coug-cuts-quiz.vercel.app/api/quiz/:path*"
    }
  ]
}
```

This proxies all `/quiz/*` requests to your quiz deployment while keeping the main domain.

---

## Recommended Approach

**For fastest deployment:**

✅ **Use Option 1: Separate Deployment**
- Deploy to `quiz.cougcuts.com`
- Add prominent link from main site
- Can be done in 30 minutes

**For best user experience:**

✅ **Use Option 2: Integrated** (if using Next.js)
- Quiz at `cougcuts.com/quiz`
- Seamless experience
- Takes 1-2 hours

**For any CMS:**

✅ **Use Option 3: Link from CMS**
- Works with WordPress, Wix, etc.
- Simple button/link
- 15 minutes to set up

---

## Post-Integration Checklist

After deploying, verify:

- [ ] Quiz loads at your chosen URL
- [ ] Email capture works
- [ ] Database saves leads
- [ ] Email sending works
- [ ] All links work
- [ ] Mobile responsive
- [ ] Analytics tracking
- [ ] Navigation back to main site works
- [ ] Branding matches main site

---

## Quick Setup Commands

### For Separate Deployment (Option 1):

```bash
# 1. Push to GitHub
cd hair-quiz
git add .
git commit -m "Hair quiz MVP"
git push

# 2. Deploy to Vercel (if using CLI)
npm i -g vercel
vercel

# 3. Set up domain in Vercel dashboard
# quiz.cougcuts.com → CNAME → cname.vercel-dns.com

# 4. Update environment variables in Vercel
# Add DATABASE_URL, RESEND_API_KEY, etc.

# 5. Run database migration
DATABASE_URL="your-production-db" npx prisma migrate deploy
```

### For Integrated (Option 2):

```bash
# 1. Copy files (from hair-quiz directory)
cp -r app/quiz ../cougcuts-website/app/
cp -r components/quiz ../cougcuts-website/components/
cp -r data ../cougcuts-website/
cp lib/routine-generator.ts ../cougcuts-website/lib/

# 2. Install dependencies in main project
cd ../cougcuts-website
npm install framer-motion react-hook-form resend

# 3. Merge Prisma schemas manually

# 4. Deploy
git add .
git commit -m "Add hair quiz"
git push
```

---

## Need Help?

1. **Check your current setup:**
   ```bash
   # From your main website directory
   cat package.json  # See what framework
   cat vercel.json   # See Vercel config
   ```

2. **Send me:**
   - Framework/platform you're using
   - Whether you have access to the codebase
   - Your Vercel dashboard access

3. **Contact:**
   - Email: logankaikalaba@gmail.com
   - I can help with the specific integration

---

## Next Steps

Choose your integration method above, then:

1. Follow the step-by-step guide
2. Test thoroughly
3. Start driving traffic!

The quiz is production-ready and waiting to capture leads. 🚀
