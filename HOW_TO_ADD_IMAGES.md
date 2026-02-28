# How to Add Your Images to the Birthday Website

## 📸 Image Locations:
The website looks for images in: `public/images/`

## 🎯 Current Image Setup:
- **Slide 1 (Background):** `/images/image-1.jpg`
- **Slide 2 (Background + Additional):** `/images/image-2.jpg`
- **Slide 20 (Background):** `/images/image-3.jpg`

## 📥 How to Add Your Images:

### Method 1: Manual Copy
1. Find your uploaded images (usually in Downloads folder)
2. Copy them to: `c:\Users\A\Desktop\vaishu-birthday\public\images\`
3. Rename them:
   - Your first image → `image-1.jpg`
   - Your second image → `image-2.jpg`
   - Your third image → `image-3.jpg`

### Method 2: Using File Explorer
1. Open File Explorer
2. Navigate to: `C:\Users\A\Desktop\vaishu-birthday\public\images\`
3. Delete the existing placeholder files
4. Copy your actual images into this folder
5. Rename them to match the names above

## 🎂 After Adding Images:
1. Restart the local server: `npm run dev`
2. Or deploy to Vercel: `npx vercel --prod`

## 📱 Image Requirements:
- Format: JPG, JPEG, or PNG
- Size: Any size (Next.js will optimize)
- Recommended: High quality for best results

## ✨ Current Website:
https://vaishu-birthday-one.vercel.app

Your images will appear on:
- Slide 1: Main background
- Slide 2: Background + centered image
- Slide 20: Final celebration background
