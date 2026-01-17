#!/bin/bash

# Deployment script for Coug Cuts Hair Quiz
# This script helps you deploy the quiz to Vercel

echo "🚀 Coug Cuts Hair Quiz - Deployment Helper"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the hair-quiz directory?"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 You have uncommitted changes. Committing now..."
    git add .
    git commit -m "Deploy: Hair quiz MVP ready for production"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

echo ""

# Ask about GitHub
echo "Do you have a GitHub repository set up for this project? (y/n)"
read -r has_github

if [ "$has_github" = "n" ]; then
    echo ""
    echo "📋 To create a GitHub repository:"
    echo "1. Go to https://github.com/new"
    echo "2. Name it: coug-cuts-quiz"
    echo "3. Don't initialize with README"
    echo "4. Click 'Create repository'"
    echo ""
    echo "Then run these commands:"
    echo "  git remote add origin https://github.com/YOUR-USERNAME/coug-cuts-quiz.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    echo ""
    echo "After that, visit https://vercel.com/new to deploy!"
    exit 0
fi

echo ""

# Check if remote is set
if ! git remote | grep -q "origin"; then
    echo "⚠️  No git remote 'origin' found."
    echo "Enter your GitHub repository URL:"
    echo "Example: https://github.com/YOUR-USERNAME/coug-cuts-quiz.git"
    read -r repo_url

    git remote add origin "$repo_url"
    echo "✅ Remote added"
fi

echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub. Please check your credentials."
    exit 1
fi

echo ""
echo "🎉 Success! Your code is on GitHub."
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Configure environment variables:"
echo "   - DATABASE_URL"
echo "   - RESEND_API_KEY"
echo "   - FROM_EMAIL"
echo "   - NEXT_PUBLIC_APP_URL"
echo "   - NEXT_PUBLIC_BOOKING_URL"
echo "4. Click Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo "📖 See INTEGRATION_GUIDE.md for integration options"
echo ""
