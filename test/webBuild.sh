npm install
expo build:web
# if the user's operating system is windows then do Compress-Archive
# else do zip
Compress-Archive .\web-build\* web-build.zip