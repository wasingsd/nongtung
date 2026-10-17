Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Divin\.gemini\antigravity-ide\brain\a15fd6cd-4a70-47b1-8bf0-a65b0a9f84df\facebook_photos_page_1792225054287.png"
$destDir = "c:\Users\Divin\.gemini\antigravity-ide\scratch\nongtung\public\images\fb"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$crops = @(
    @{ Name = "real-fb-1.jpg"; X = 563; Y = 553; W = 183; H = 155 },
    @{ Name = "real-fb-2.jpg"; X = 757; Y = 553; W = 183; H = 155 },
    @{ Name = "real-fb-3.jpg"; X = 951; Y = 553; W = 183; H = 155 },
    @{ Name = "real-fb-4.jpg"; X = 1146; Y = 553; W = 183; H = 155 },
    @{ Name = "real-fb-5.jpg"; X = 1340; Y = 553; W = 183; H = 155 },
    @{ Name = "real-fb-6.jpg"; X = 757; Y = 762; W = 183; H = 140 },
    @{ Name = "real-fb-7.jpg"; X = 951; Y = 762; W = 183; H = 140 }
)

foreach ($crop in $crops) {
    $rect = New-Object System.Drawing.Rectangle($crop.X, $crop.Y, $crop.W, $crop.H)
    $croppedBmp = $bmp.Clone($rect, $bmp.PixelFormat)
    $outPath = Join-Path $destDir $crop.Name
    $croppedBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $croppedBmp.Dispose()
    Write-Output "Saved: $outPath"
}

$bmp.Dispose()
