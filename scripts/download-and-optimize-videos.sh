#!/bin/bash
# =============================================================================
# Dubai Mall Sales Deck — Video Asset Pipeline
# Downloads, trims, compresses, and generates posters for all video assets
# =============================================================================

set -e  # Exit on any error

# Create directories
mkdir -p videos/original videos/optimized videos/posters videos/previews

# =============================================================================
# CONFIGURATION
# =============================================================================

# Video sources (replace with actual URLs after choosing from search results)
declare -A VIDEOS=(
    ["hero"]="https://www.youtube.com/watch?v=yG7JpbTtx1M"           # 8k Dubai Drone Night
    ["events-nye"]="https://www.youtube.com/watch?v=NdXyTFktapM"    # Fountain Show
    ["events-fashion"]="https://www.youtube.com/watch?v=KqvkBdUy3c8" # Dubai Mall Interior
    ["retail-interior"]="https://www.youtube.com/watch?v=CwnnepeJXdw" # Cinematic Tour
)

# Clip configurations: name:start_time:duration:target_width:crf
declare -A CLIPS=(
    # Hero: 15s aerial sweep, 1920px, high quality
    ["hero"]="0:00:15:1920:24"

    # Events: 10s fountain show clips
    ["events-nye"]="0:00:30:1920:26"
    ["events-fashion"]="0:01:00:1920:26"
    ["events-concert"]="0:02:00:1920:26"

    # Venue backgrounds: 12s ambient loops
    ["venue-arena"]="0:00:45:1920:28"
    ["venue-atrium"]="0:01:30:1920:28"

    # Retail path panel: 8s luxury interior
    ["retail-luxury"]="0:00:20:1920:28"

    # Sponsorship path panel: 8s crowd/activation
    ["sponsorship-crowd"]="0:03:00:1920:28"
)

# =============================================================================
# FUNCTIONS
# =============================================================================

download_video() {
    local name=$1
    local url=$2
    local output="videos/original/${name}.mp4"

    echo "📥 Downloading: $name"
    if [ ! -f "$output" ]; then
        yt-dlp -f "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]"                --merge-output-format mp4                -o "$output"                "$url"
        echo "✅ Downloaded: $output"
    else
        echo "⏭️  Already exists: $output"
    fi
}

optimize_clip() {
    local name=$1
    local config=$2

    IFS=':' read -r start duration width crf <<< "$config"

    local input="videos/original/${name}.mp4"
    local output="videos/optimized/${name}.mp4"
    local poster="videos/posters/${name}.jpg"
    local preview="videos/previews/${name}.mp4"

    # Check if source exists (some clips share source files)
    if [ ! -f "$input" ]; then
        echo "⚠️  Source not found for $name, skipping..."
        return
    fi

    echo "🎬 Processing: $name (${duration}s @ ${width}px, CRF ${crf})"

    # Main optimized clip
    ffmpeg -y -ss "$start" -t "$duration" -i "$input"         -c:v libx264         -crf "$crf"         -preset slow         -vf "scale=${width}:-2:flags=lanczos,format=yuv420p"         -movflags +faststart         -an         -pix_fmt yuv420p         "$output"

    # Poster frame (2 seconds in, or middle of clip)
    local poster_time=$(echo "$duration / 2" | bc)
    ffmpeg -y -ss "$poster_time" -i "$input"         -vframes 1         -q:v 2         "$poster"

    # Low-res preview for lazy loading (640px, higher CRF = smaller)
    ffmpeg -y -ss "$start" -t "$duration" -i "$input"         -c:v libx264         -crf 32         -preset fast         -vf "scale=640:-2:flags=lanczos,format=yuv420p"         -an         "$preview"

    # Get file sizes
    local orig_size=$(du -h "$input" 2>/dev/null | cut -f1)
    local opt_size=$(du -h "$output" | cut -f1)
    local prev_size=$(du -h "$preview" | cut -f1)

    echo "   Original: $orig_size → Optimized: $opt_size → Preview: $prev_size"
    echo "   Poster: $poster"
    echo ""
}

generate_fallback_posters() {
    echo "🎨 Generating AI-style fallback posters with ImageMagick..."

    for poster in videos/posters/*.jpg; do
        if [ -f "$poster" ]; then
            # Add dark cinematic overlay
            convert "$poster"                 -fill "rgba(0,0,0,0.4)"                 -draw "rectangle 0,0,1920,1080"                 -modulate 80,90                 -contrast-stretch 2%x2%                 "${poster%.jpg}-cinematic.jpg"

            # Create blurred version for loading states
            convert "$poster"                 -blur 0x20                 -modulate 50                 "${poster%.jpg}-blur.jpg"
        fi
    done

    echo "✅ Fallback posters generated"
}

print_stats() {
    echo ""
    echo "============================================================================="
    echo "📊 OPTIMIZATION STATS"
    echo "============================================================================="

    echo ""
    echo "Optimized Clips:"
    ls -lh videos/optimized/

    echo ""
    echo "Posters:"
    ls -lh videos/posters/

    echo ""
    echo "Previews (lazy-load):"
    ls -lh videos/previews/

    echo ""
    echo "Total size:"
    du -sh videos/
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

echo "============================================================================="
echo "🏗️  Dubai Mall Sales Deck — Video Asset Pipeline"
echo "============================================================================="
echo ""

# Step 1: Download all source videos
echo "📥 PHASE 1: Downloading source videos..."
echo ""
for name in "${!VIDEOS[@]}"; do
    download_video "$name" "${VIDEOS[$name]}"
done

# Step 2: Optimize clips
echo ""
echo "⚡ PHASE 2: Optimizing clips..."
echo ""
for name in "${!CLIPS[@]}"; do
    optimize_clip "$name" "${CLIPS[$name]}"
done

# Step 3: Generate fallback posters
echo ""
echo "🎨 PHASE 3: Generating cinematic fallback posters..."
echo ""
if command -v convert &> /dev/null; then
    generate_fallback_posters
else
    echo "⚠️  ImageMagick not found. Install with: brew install imagemagick"
    echo "   (Fallback posters skipped — you can add dark overlays in CSS instead)"
fi

# Step 4: Print stats
echo ""
print_stats

echo ""
echo "============================================================================="
echo "✅ DONE! Copy videos/optimized/ and videos/posters/ to your public/ folder"
echo "============================================================================="
