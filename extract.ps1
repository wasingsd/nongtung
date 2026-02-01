$files = @("favicon", "logo", "typo_logo")
foreach ($f in $files) {
    $src = "d:\nongtung\public\images\$f.svg"
    $dest = "d:\nongtung\public\images\$f.png"
    Write-Host "Processing $src"
    $content = [System.IO.File]::ReadAllText($src)
    if ($content -match 'data:image/png;base64,([^"]+)') {
        $base64 = $Matches[1]
        $bytes = [System.Convert]::FromBase64String($base64)
        [System.IO.File]::WriteAllBytes($dest, $bytes)
        Write-Host "Saved $dest"
    } else {
        Write-Host "No match for $f"
    }
}
