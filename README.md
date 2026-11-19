mkdir build-my-vision && cd build-my-vision
git init
echo "# Build My Vision" > README.md
echo "A platform connecting customers with interior designers." >> README.md
git add README.md
git commit -m "docs: initialize README"
git branch -M main
git remote add origin https://github.com/<your-username>/build-my-vision.git
git push -u origin main
