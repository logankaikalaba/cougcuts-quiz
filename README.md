# Coug Cuts Hair Care Quiz System

A hyperpersonalized hair care routine generator for WSU students. This lead magnet captures emails, generates custom hair routines, and drives bookings for Coug Cuts barbershop.

## Features

✅ **Hyperpersonalized Routines**: 1000+ unique routine combinations based on hair type, lifestyle, and budget
✅ **Conditional Quiz Flow**: Dynamic questions based on hair type (curly, straight, coily, wavy)
✅ **Email Automation**: Automated routine delivery with Resend
✅ **PDF Generation**: Downloadable routine guides
✅ **Lead Tracking**: Complete analytics and conversion tracking
✅ **Mobile-First Design**: Optimized for student mobile usage

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Email**: Resend + React Email
- **PDF**: HTML-based generation (ready for puppeteer/react-pdf)
- **Deployment**: Vercel

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

The `.env` file is already configured with defaults. Update these values:

```env
# Database - Update with your PostgreSQL connection string
DATABASE_URL="postgresql://..."

# Email - Get from resend.com
RESEND_API_KEY="re_..."
FROM_EMAIL="logan@cougcuts.com"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_BOOKING_URL="https://cougcuts.com/book"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
hair-quiz/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── quiz/
│   │   ├── page.tsx            # Main quiz flow
│   │   ├── email/page.tsx      # Email capture
│   │   └── complete/page.tsx   # Thank you page
│   └── api/
│       ├── quiz/submit/        # Quiz submission endpoint
│       └── analytics/          # Analytics tracking
├── components/
│   └── quiz/                   # Quiz components
├── data/
│   ├── questions.ts            # All quiz questions
│   └── products.ts             # Product database (40+ products)
├── lib/
│   ├── prisma.ts              # Database client
│   ├── routine-generator.ts    # Core algorithm
│   ├── email.ts               # Email utilities
│   └── pdf-generator.ts       # PDF generation
└── prisma/
    └── schema.prisma          # Database schema
```

## Database Setup

### Option 1: Supabase (Recommended)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection String
4. Copy connection string to `DATABASE_URL` in `.env`
5. Run `npx prisma migrate dev`

### Option 2: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `createdb hairquiz`
3. Update `DATABASE_URL` in `.env`
4. Run migrations

## Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com) - Free tier: 100 emails/day
2. Verify your domain or use test domain for development
3. Create API key
4. Add to `RESEND_API_KEY` in `.env`
5. Update `FROM_EMAIL` to your verified email

## Key Features

### Routine Generation Algorithm

Located in `lib/routine-generator.ts`, creates personalized routines by:

1. **Profile ID Creation**: Unique identifier like `curly_3b_high_porosity_gym_frizz_5min_mid`
2. **Challenge Identification**: Diagnoses specific hair issues based on answer combinations
3. **Routine Building**: Custom morning (3-20 min) + wash day (15-60 min) routines
4. **Product Selection**: Budget-appropriate recommendations from 40+ products
5. **WSU-Specific Tips**: Pullman water, dorm life, campus-specific hacks

### Quiz Flow

- **Universal Questions**: Hair type & goals (everyone answers)
- **Conditional Questions**: Type-specific questions for curly, straight, coily, or wavy
- **Budget Question**: Determines product tier (low/mid/premium)
- **Auto-Advance**: Single-choice questions auto-advance for 60% faster completion
- **Progress Tracking**: Visual progress bar keeps users engaged

### Database Schema

- **Lead**: Email, quiz answers, routine, marketing data, conversion tracking
- **QuizSession**: Session tracking, drop-off analysis, time-per-question
- **EmailEvent**: Email engagement tracking (sent, opened, clicked)

## API Endpoints

### POST `/api/quiz/submit`

Submit quiz and generate routine.

```typescript
{
  "sessionId": "string",
  "email": "user@wsu.edu",
  "name": "John",
  "answers": {
    "hair_type": "curly",
    "hair_goals": ["moisture", "definition"],
    "curl_pattern": "medium",
    "porosity": "high",
    "budget": "mid"
  }
}
```

Response:

```typescript
{
  "success": true,
  "leadId": "clx...",
  "routine": { /* full routine object */ }
}
```

### POST `/api/analytics`

Track event.

```typescript
{
  "event": "quiz_started",
  "sessionId": "string",
  "properties": {}
}
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Production Checklist

- [ ] Set up production database (Supabase)
- [ ] Configure Resend with verified domain
- [ ] Update `NEXT_PUBLIC_BOOKING_URL` to real booking page
- [ ] Set up PDF storage (Cloudflare R2 / S3 / Vercel Blob)
- [ ] Add analytics integration
- [ ] Test email deliverability
- [ ] Add rate limiting to API routes
- [ ] Configure error tracking (Sentry)

## Success Metrics

### Month 1 Goals
- **250 quiz completions**
- **50% completion rate**
- **80% email capture rate**
- **20 bookings** (10% conversion)
- **$800 revenue** ($40/cut)

### Analytics Tracked
- Quiz starts vs completions
- Drop-off by question
- Hair type distribution
- Budget tier distribution
- Email open/click rates
- Booking conversions

## Customization

### Add Hair Type

1. Add questions to `data/questions.ts`
2. Update conditional logic in quiz flow
3. Add challenge scenarios in `routine-generator.ts`
4. Create routines in `buildMorningRoutine()` and `buildWashDayRoutine()`

### Add Products

Edit `data/products.ts`:

```typescript
{
  id: 'product_id',
  name: 'Product Name',
  brand: 'Brand',
  category: 'shampoo', // shampoo, conditioner, treatment, styler, oil, tool
  price: 15.99,
  buyLink: 'https://amazon.com/...',
  tier: 'low', // low (<$30/mo), mid ($30-70), premium ($70+)
  hairTypes: ['curly'],
  concerns: ['frizz', 'moisture'],
  description: 'Brief description',
  usage: 'How to use instructions',
  lastingTime: 2 // months
}
```

### Modify Branding

Colors are set to WSU Crimson (`#8B0000`). To rebrand:

1. Search/replace `#8B0000` with your primary color
2. Update testimonials and copy
3. Change business name in footer
4. Update booking URL

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# View current data
npx prisma studio
```

### Email Not Sending

- Check Resend dashboard for logs
- Verify domain/email is verified
- Check API key is correct in `.env`
- Test with Resend test mode first

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## What's Included

### Complete Files Created

- ✅ Landing page with WSU branding
- ✅ Full quiz flow with 4 hair types × 5 questions each
- ✅ Email capture page with validation
- ✅ Thank you page with social proof
- ✅ Quiz question components (Single/Multi/Image choice)
- ✅ Progress bar and navigation
- ✅ Routine generation algorithm
- ✅ Product database (40+ products)
- ✅ Challenge identification system
- ✅ Email templates (HTML + text)
- ✅ PDF generation utility
- ✅ API routes (quiz submit, analytics)
- ✅ Prisma schema with 3 models
- ✅ Type definitions throughout

### What to Add Next

1. **PDF Storage**: Implement uploadPDF() in `lib/pdf-generator.ts` with your storage provider
2. **Email Sequences**: Set up follow-up email automation (Day 3, 7, 14, 30)
3. **Admin Dashboard**: Build analytics dashboard at `/admin`
4. **Payment Integration**: If adding paid consultations
5. **SMS Notifications**: For appointment reminders

## Support

- **Email**: logankaikalaba@gmail.com
- **Issues**: GitHub Issues
- **Docs**: See inline code comments

## License

Proprietary - Coug Cuts © 2025

---

**Built for WSU students by Logan at Coug Cuts**

Transform hair care. Drive bookings. Build your list. 💈
