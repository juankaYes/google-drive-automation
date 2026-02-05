function copyEntireDriveFolder() {
  const sourceFolderId = ''; // Source folder ID
  const destParentFolderId = ''; // Target parent folder ID

  const sourceFolder = DriveApp.getFolderById(sourceFolderId);
  const destParentFolder = DriveApp.getFolderById(destParentFolderId);
  
  const newFolder = destParentFolder.createFolder(sourceFolder.getName());
  copyFolderContents(sourceFolder, newFolder);
  
  Logger.log("Copied to folder: " + newFolder.getName());
}

function copyFolderContents(source, destination) {
  // Copy files
  const files = source.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const copiedFile = file.makeCopy(file.getName(), destination);
    Logger.log("Copied file: " + copiedFile.getName());
  }

  // Copy subfolders recursively
  const folders = source.getFolders();
  while (folders.hasNext()) {
    const subFolder = folders.next();
    const newSubFolder = destination.createFolder(subFolder.getName());
    Logger.log("Created folder: " + newSubFolder.getName());
    copyFolderContents(subFolder, newSubFolder);
  }
}
