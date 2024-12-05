const firebase = require('firebase/app');
const firebaseStorage = require('firebase/storage')
const multer = require('multer');

firebase.initializeApp({
    apiKey: "AIzaSyDjK44x4JMcDJH2QYjMRSW4J5vheOv4vf4",
    authDomain: "file-storage-5ae72.firebaseapp.com",
    projectId: "file-storage-5ae72",
    storageBucket: "file-storage-5ae72.appspot.com",
    messagingSenderId: "614287158969",
    appId: "1:614287158969:web:aba3d1e41d447bf288f568",
    measurementId: "G-JGLEWZ75F1"
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only image files are allowed."));
    }
}

const storage = firebaseStorage.getStorage();
const multerUpload = multer({ storage: multer.memoryStorage(), fileFilter: fileFilter });

const uploadFileToFirebase = async (file, userType, fileType) => {
    try {
        let destinationPath;
        const dateTime = new Date().getTime()

        if (userType == "web" && fileType == "Images") {
            destinationPath = `web/Images/${file.originalname}-${dateTime}`;
        } if (userType == "category" && fileType == "Images") {
            destinationPath = `category/Images/${file.originalname}-${dateTime}`;
        }


        const storageRef = firebaseStorage.ref(storage, destinationPath);
        const metadata = { contentType: file.mimetype };

        const snapshot = await firebaseStorage.uploadBytes(storageRef, file.buffer, metadata);
        const downloadURL = await firebaseStorage.getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error("Error uploading to Firebase Storage:", error);
        throw error;
    }
};

const deleteFileFromFirebase = async (filePath) => {
    try {
        const storageRef = firebaseStorage.ref(storage, filePath);

        if (!filePath || filePath === "/") {
            throw new Error("Invalid file path. Cannot delete from root.");
        }

        await firebaseStorage.deleteObject(storageRef);
    } catch (error) {
        console.error("Error deleting file from Firebase Storage:", error);
        throw error;
    }
};

module.exports = { uploadFileToFirebase, deleteFileFromFirebase, multerUpload };
