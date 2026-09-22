# Repositiory for the official website of Karl Uwe Martin

Powered by: 
https://nextjs.org/ 
https://mui.com/material-ui/

Official website:
https://karluwemartin.de

## Run
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Update open-source license sheet
After installing dependencies, regenerate the license data used by the Open Source page with:
```bash
npx license-checker --json --out src/oss.json
node -e "const fs=require('fs'); const file='src/oss.json'; const data=JSON.parse(fs.readFileSync(file,'utf8')); for (const entry of Object.values(data)) { delete entry.path; delete entry.licenseFile; } fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\\n');"
```
The second command removes local `path` and `licenseFile` fields from the generated data.

## Notes
- Uses Next.js App Router (`/app`).
- MUI uses Emotion as the styling engine.
