$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path videos/raw, videos/clips, videos/posters | Out-Null

$HERO_URL = "https://www.youtube.com/watch?v=yG7JpbTtx1M"
$HERO_START = "00:00:20"
$HERO_DURATION = "15"
$HERO_OUTPUT = "hero-aerial-night"

$EVENTS_URL = "https://www.youtube.com/watch?v=f83oCDJMtXs"
$EVENTS_START = "00:01:30"
$EVENTS_DURATION = "12"
$EVENTS_OUTPUT = "events-fountain-show"

$INTERIOR_URL = "https://www.youtube.com/watch?v=KqvkBdUy3c8"
$INTERIOR_START = "00:02:00"
$INTERIOR_DURATION = "10"
$INTERIOR_OUTPUT = "interior-luxury-walk"

$VENUE_URL = "https://www.youtube.com/watch?v=NdXyTFktapM"
$VENUE_START = "00:03:00"
$VENUE_DURATION = "12"
$VENUE_OUTPUT = "venue-ambient-fountain"

function Download-Video {
    param([string]$url, [string]$name)
    Write-Host "Downloading: $name..."
    python -m yt_dlp -f "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]" --merge-output-format mp4 -o "videos/raw/${name}.%(ext)s" $url
    if ($LASTEXITCODE -ne 0) {
        Write-Error "yt-dlp failed to download $name. Please try again."
        exit 1
    }
    Write-Host "Downloaded: videos/raw/${name}.mp4"
}

function Extract-Clip {
    param([string]$input_name, [string]$start, [string]$duration, [string]$output_name)
    $input_file = "videos/raw/${input_name}.mp4"

    if (-not (Test-Path $input_file)) {
        Write-Error "Cannot extract clip: Input file $input_file does not exist! Download likely failed or was interrupted."
        exit 1
    }

    Write-Host "Extracting clip: $output_name (${duration}s from $start)..."

    ffmpeg -y -ss $start -t $duration -i $input_file -c:v libx264 -crf 28 -preset slow -vf "scale=1920:-2:flags=lanczos,format=yuv420p" -movflags +faststart -an "videos/clips/${output_name}.mp4"
    ffmpeg -y -ss $start -t $duration -i $input_file -c:v libx264 -crf 32 -preset fast -vf "scale=640:-2:flags=lanczos,format=yuv420p" -movflags +faststart -an "videos/clips/${output_name}-preview.mp4"
    ffmpeg -y -ss $start -i $input_file -ss 2 -vframes 1 -q:v 2 "videos/posters/${output_name}-poster.jpg"
    ffmpeg -y -ss $start -i $input_file -ss 2 -vframes 1 -c:v libwebp -q:v 85 "videos/posters/${output_name}-poster.webp"

    Write-Host "Created:"
    Write-Host "   - videos/clips/${output_name}.mp4"
    Write-Host "   - videos/clips/${output_name}-preview.mp4"
    Write-Host "   - videos/posters/${output_name}-poster.jpg"
    Write-Host "   - videos/posters/${output_name}-poster.webp"
}

function Generate-Report {
    Write-Host ""
    Write-Host "============================================================"
    Write-Host "ASSET REPORT"
    Write-Host "============================================================"
    Write-Host ""
    Write-Host "Clips:"
    Get-ChildItem videos/clips/ | Format-Table Name, Length
    Write-Host ""
    Write-Host "Posters:"
    Get-ChildItem videos/posters/ | Format-Table Name, Length
    Write-Host ""
    Write-Host "============================================================"
    Write-Host "Next steps:"
    Write-Host "   1. Copy clips to your Next.js public/videos/ folder"
    Write-Host "   2. Copy posters to your Next.js public/images/ folder"
    Write-Host "   3. Update constants.ts with actual file paths"
    Write-Host "============================================================"
}

Write-Host "============================================================"
Write-Host "Dubai Mall Sales Deck - Video Asset Pipeline"
Write-Host "============================================================"
Write-Host ""

Download-Video $HERO_URL "hero"
Download-Video $EVENTS_URL "events"
Download-Video $INTERIOR_URL "interior"
Download-Video $VENUE_URL "venue"

Extract-Clip "hero" $HERO_START $HERO_DURATION $HERO_OUTPUT
Extract-Clip "events" $EVENTS_START $EVENTS_DURATION $EVENTS_OUTPUT
Extract-Clip "interior" $INTERIOR_START $INTERIOR_DURATION $INTERIOR_OUTPUT
Extract-Clip "venue" $VENUE_START $VENUE_DURATION $VENUE_OUTPUT

Generate-Report

Write-Host ""
Write-Host "All assets ready!"
