Git Large File Storage is needed to use the database backup: appdb_backup.bak

1. Download from https://git-lfs.github.com/

2. Setup for your account (only run once per account)

git lfs install

If adding files to be tracked

git lfs track "\*.file-extention-to-be-tracked"

Currently git lfs is tracking .bak files as shown in .gitattributes file
