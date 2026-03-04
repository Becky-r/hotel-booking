import os
from PIL import Image

# Configuration
SOURCE_DIR = "."        # Current folder
TARGET_DIR = "./fixed"  # Where the fixed photos go
MAX_SIZE = 4000         # Longest side in pixels (ImageKit safe zone)

def fix_my_canon_photos():
    # Make sure the fixed folder exists
    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)

    # Loop through all files in the current directory
    for filename in os.listdir(SOURCE_DIR):
        if filename.lower().endswith(".jpg"):
            print(f"Processing: {filename}...")
            
            # 1. Open the image
            img_path = os.path.join(SOURCE_DIR, filename)
            img = Image.open(img_path)
            
            # 2. Calculate new size (keep aspect ratio)
            width, height = img.size
            if width > height:
                new_width = MAX_SIZE
                new_height = int(MAX_SIZE * height / width)
            else:
                new_height = MAX_SIZE
                new_width = int(MAX_SIZE * width / height)
            
            # 3. Resize it
            img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # 4. Save to 'fixed' folder (Force RGB to fix Canon color profiles)
            output_path = os.path.join(TARGET_DIR, filename)
            img_resized.convert("RGB").save(output_path, "JPEG", quality=90)
            
            print(f"Done! Saved to {output_path}")

if __name__ == "__main__":
    fix_my_canon_photos()
