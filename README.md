# google-drive-automation

## Project Overview
This repository contains a collection of scripts designed to automate tasks in Google Drive, Google Forms, and Google Spreadsheets. These scripts are written in JavaScript and utilize Google Apps Script to streamline workflows and improve productivity.

## Folder Structure

- **Google Form/**
  - `leaveForm.js`: Automates the process of managing leave requests through Google Forms. This script sends email notifications to teachers based on the leave request submitted through the form and adds an event in the calendar
  Find both spreadsheet ("Students Info.xlsx") and google doc ("Report Template.docx") templates 


- **Google Spreadsheet/**
  - `reportCardAutomation.js`: Automates the generation of report cards using data from Google Spreadsheets. It uses a Google Doc template to create personalized report cards for each student and saves them in a specified folder.

- **folderCopy.js**: A standalone script to duplicate folders in Google Drive while preserving the folder structure and contents.

## Prerequisites
To use these scripts, you need:

1. A Google account.
2. Access to the Google Apps Script editor.
3. Basic knowledge of JavaScript and Google Apps Script.

## How to Use

1. Open the Google Apps Script editor by visiting [script.google.com](https://script.google.com).
2. Create a new project or open an existing one.
3. Copy the relevant script from this repository and paste it into the Apps Script editor.
4. Save and authorize the script to access your Google account.
5. Run the script and follow any on-screen instructions.
