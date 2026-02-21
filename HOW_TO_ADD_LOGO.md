# 🎨 How to Add Your Silsalay Logo

## Quick Steps:

### 1. Save Your Logo Image
- Save the Silsalay logo image you provided
- Name it: `logo.png`
- Place it in the `public` folder of your project

### 2. File Path
```
your-project/
  └── public/
      └── logo.png  ← Place your logo here
```

### 3. That's It!
The logo will automatically appear in:
- ✅ Desktop navbar (48x48px, round with green border)
- ✅ Mobile navbar (40x40px, round with green border)
- ✅ Mobile menu (32x32px, round with green border)

## Logo Features:
- 🔵 **Round shape** - Automatically cropped to circle
- 🟢 **Green border** - 2px border matching your brand
- 📱 **Responsive** - Different sizes for mobile/desktop
- ✨ **Hover effect** - Scales up slightly on hover
- 🎯 **Fallback** - Gracefully hides if image fails to load

## Recommended Logo Specs:
- **Format**: PNG (with transparent background preferred)
- **Size**: 512x512px or higher (square)
- **Quality**: High resolution for crisp display

## Alternative: Use a Different Image Name
If you want to use a different filename, update line in `components/Layout.tsx`:
```tsx
src="/logo.png"  // Change this to your filename
```

---

Your logo is now integrated and will display beautifully across all devices! 🎉
