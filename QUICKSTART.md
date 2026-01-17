# Quick Start Guide

Get your hair quiz running locally in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- PostgreSQL database (local or cloud)

## 5-Minute Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Configure Database (2 min)

**Option A: Use Existing Prisma Dev Database**

The project comes pre-configured with a local Prisma Postgres instance. Just run:

```bash
npx prisma generate
```

**Option B: Use Your Own PostgreSQL**

Update `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/hairquiz"
```

Then run:

```bash
npx prisma migrate dev --name init
```

### 3. Start Development Server (1 min)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Test the Quiz (1 min)

1. Click "Get My Free Personalized Routine"
2. Complete quiz questions
3. Enter any email (emails won't send without Resend API key)
4. View generated routine

## That's It!

Your quiz is now running locally. The system will:

✅ Generate personalized routines
✅ Save leads to database (view with `npx prisma studio`)
✅ Create profile IDs
✅ Calculate product costs

## What's NOT Working Yet (Need Setup)

❌ **Email Sending** - Requires Resend API key
❌ **PDF Downloads** - Requires storage setup
❌ **Production Database** - Using local Prisma dev instance

## Next Steps

### To Enable Email Sending

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Update `.env`:
   ```bash
   RESEND_API_KEY="re_..."
   FROM_EMAIL="your@email.com"
   ```
4. Restart server

### To View Database

```bash
npx prisma studio
```

Opens browser interface to view all leads, sessions, and email events.

### To Test Different Hair Types

Try these test scenarios:

**Curly Hair Student**
- Hair Type: Curly
- Goals: Moisture, Definition
- Pattern: Tight curls (3C)
- Activity: Very active (gym 5+ times)
- Budget: Low

**Straight Hair Student**
- Hair Type: Straight
- Goals: Volume, Damage repair
- Texture: Fine
- Concern: No volume
- Budget: Mid

**Check Results**: Each generates completely different routines!

## Common Issues

### Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Database Connection Error

```bash
# Reset Prisma
rm -rf node_modules/.prisma
npx prisma generate
```

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

## Project Structure Quick Reference

```
Key Files:
├── app/page.tsx              → Landing page
├── app/quiz/page.tsx         → Quiz flow
├── app/api/quiz/submit/      → Quiz submission
├── data/questions.ts         → All quiz questions
├── data/products.ts          → Product database
└── lib/routine-generator.ts  → Core algorithm
```

## Tips for Development

### Hot Reload is Enabled

- Save any file to see changes instantly
- Tailwind classes update in real-time
- API routes reload automatically

### View Console Logs

Check terminal for:
- Quiz submissions
- Routine generation logs
- Email sending attempts
- Database queries (if enabled)

### Test Different Scenarios

The quiz has conditional logic based on hair type:
- Curly hair: 7 questions
- Straight hair: 7 questions
- Wavy hair: 7 questions
- Coily hair: 7 questions

Each path generates unique routines!

## Development Workflow

1. **Make Changes**
   - Edit components in `components/`
   - Update questions in `data/questions.ts`
   - Modify algorithm in `lib/routine-generator.ts`

2. **Test Locally**
   - Run quiz with different inputs
   - Check database with Prisma Studio
   - Verify routine generation

3. **Deploy**
   - Push to GitHub
   - Auto-deploys via Vercel
   - Test production URL

## Need Help?

- **Docs**: See [README.md](README.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Email**: logankaikalaba@gmail.com

---

Happy coding! 🚀
