#!/bin/bash
# ============================================================
# Dubai Mall Sales Deck — Video Asset Pipeline
# ============================================================
# This script downloads YouTube videos and extracts optimized
# clips for the interactive sales deck.
#
# REQUIREMENTS:
#   - yt-dlp: pip install yt-dlp
#   - ffmpeg: https://ffmpeg.org/download.html
#
# USAGE:
#   chmod +x download-assets.sh
#   ./download-assets.sh
# ============================================================

set -e

# Create directories
mkdir -p videos/raw videos/clips videos/posters

# ============================================================
# CONFIGURATION — Video Sources
# ============================================================

# Hero: Aerial night drone footage of Downtown Dubai / Burj Khalifa
HERO_URL="https://www.youtube.com/watch?v=yG7JpbTtx1M"
HERO_START="00:00:15"
HERO_DURATION="15"
HERO_OUTPUT="hero-aerial-night"

# Events: Dubai Fountain show (crowd energy, live event)
EVENTS_URL="https://www.youtube.com/watch?v=f83oCDJMtXs"
EVENTS_START="00:01:30"
EVENTS_DURATION="12"
EVENTS_OUTPUT="events-fountain-show"

# Interior: Dubai Mall interior walkthrough (retail atmosphere)
INTERIOR_URL="https://www.youtube.com/watch?v=KqvkBdUy3c8"
INTERIOR_START="00:02:00"
INTERIOR_DURATION="10"
INTERIOR_OUTPUT="interior-luxury-walk"

# Venue: Slow fountain finale (ambient booking CTA background)
VENUE_URL="https://www.youtube.com/watch?v=NdXyTFktapM"
VENUE_START="00:03:00"
VENUE_DURATION="12"
VENUE_OUTPUT="venue-ambient-fountain"

# ============================================================
# DOWNLOAD FUNCTION
# ============================================================

download_video() {
    local url=$1
    local name=$2
    echo "📥 Downloading: $name..."
    yt-dlp -f "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]"         --merge-output-format mp4         -o "videos/raw/${name}.%(ext)s"         "$url"
    echo "✅ Downloaded: videos/raw/${name}.mp4"
}

# ============================================================
# CLIP EXTRACTION & OPTIMIZATION FUNCTION
# ============================================================

extract_clip() {
    local input_name=$1
    local start=$2
    local duration=$3
    local output_name=$4
    local input_file="videos/raw/${input_name}.mp4"

    echo "✂️  Extracting clip: $output_name (${duration}s from $start)..."

    # Main clip: 1080p, H.264, CRF 28 (high quality, reasonable size)
    ffmpeg -y -ss "$start" -t "$duration" -i "$input_file"         -c:v libx264 -crf 28 -preset slow         -vf "scale=1920:-2:flags=lanczos,format=yuv420p"         -movflags +faststart         -an         "videos/clips/${output_name}.mp4"

    # Low-res preview: 640px width, CRF 32 (fast load, small size)
    ffmpeg -y -ss "$start" -t "$duration" -i "$input_file"         -c:v libx264 -crf 32 -preset fast         -vf "scale=640:-2:flags=lanczos,format=yuv420p"         -movflags +faststart         -an         "videos/clips/${output_name}-preview.mp4"

    # Poster frame: high-quality JPEG from 2 seconds into the clip
    ffmpeg -y -ss "$start" -i "$input_file" -ss 2 -vframes 1         -q:v 2         "videos/posters/${output_name}-poster.jpg"

    # Poster frame: WebP for modern browsers (smaller, better quality)
    ffmpeg -y -ss "$start" -i "$input_file" -ss 2 -vframes 1         -c:v libwebp -q:v 85         "videos/posters/${output_name}-poster.webp"

    echo "✅ Created:"
    echo "   - videos/clips/${output_name}.mp4"
    echo "   - videos/clips/${output_name}-preview.mp4"
    echo "   - videos/posters/${output_name}-poster.jpg"
    echo "   - videos/posters/${output_name}-poster.webp"
    echo ""
}

# ============================================================
# REPORTING FUNCTION
# ============================================================

generate_report() {
    echo ""
    echo "============================================================"
    echo "📊 ASSET REPORT"
    echo "============================================================"
    echo ""
    echo "Clips:"
    ls -lh videos/clips/
    echo ""
    echo "Posters:"
    ls -lh videos/posters/
    echo ""
    echo "Total size:"
    du -sh videos/
    echo ""
    echo "============================================================"
    echo "🎬 Next steps:"
    echo "   1. Copy clips to your Next.js public/videos/ folder"
    echo "   2. Copy posters to your Next.js public/images/ folder"
    echo "   3. Update constants.ts with actual file paths"
    echo "============================================================"
}

# ============================================================
# EXECUTION
# ============================================================

echo "============================================================"
echo "🎬 Dubai Mall Sales Deck — Video Asset Pipeline"
echo "============================================================"
echo ""

# Download all raw videos
download_video "$HERO_URL" "hero"
download_video "$EVENTS_URL" "events"
download_video "$INTERIOR_URL" "interior"
download_video "$VENUE_URL" "venue"

# Extract and optimize clips
extract_clip "hero" "$HERO_START" "$HERO_DURATION" "$HERO_OUTPUT"
extract_clip "events" "$EVENTS_START" "$EVENTS_DURATION" "$EVENTS_OUTPUT"
extract_clip "interior" "$INTERIOR_START" "$INTERIOR_DURATION" "$INTERIOR_OUTPUT"
extract_clip "venue" "$VENUE_START" "$VENUE_DURATION" "$VENUE_OUTPUT"

# Generate final report
generate_report

echo ""
echo "🎉 All assets ready!"
