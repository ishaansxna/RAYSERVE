
import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';

// Generic function to get a document
export const getDocument = async (collectionName: string, id: string): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting ${collectionName} document:`, error);
    throw error;
  }
};

// Generic function to get all documents in a collection
export const getDocuments = async (collectionName: string): Promise<DocumentData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error getting ${collectionName} documents:`, error);
    throw error;
  }
};

// Generic function to create a document with a custom ID
export const setDocument = async (collectionName: string, id: string, data: any): Promise<void> => {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (error) {
    console.error(`Error setting ${collectionName} document:`, error);
    throw error;
  }
};

// Generic function to create a document with auto-generated ID
export const addDocument = async (collectionName: string, data: any): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding ${collectionName} document:`, error);
    throw error;
  }
};

// Generic function to update a document
export const updateDocument = async (collectionName: string, id: string, data: any): Promise<void> => {
  try {
    await updateDoc(doc(db, collectionName, id), data);
  } catch (error) {
    console.error(`Error updating ${collectionName} document:`, error);
    throw error;
  }
};

// Generic function to delete a document
export const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error(`Error deleting ${collectionName} document:`, error);
    throw error;
  }
};

// Function to query documents by field
export const queryDocuments = async (
  collectionName: string, 
  fieldPath: string, 
  operator: any, 
  value: any
): Promise<DocumentData[]> => {
  try {
    const q = query(collection(db, collectionName), where(fieldPath, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error querying ${collectionName} documents:`, error);
    throw error;
  }
};

// Solar specific functions
export const getUserSolarData = async (userId: string) => {
  try {
    const solarData = await getDocument('solarData', userId);
    if (!solarData) {
      // Create default data if it doesn't exist
      const defaultData = {
        totalProduction: 0,
        monthlyProduction: [],
        installation: {
          date: null,
          panelType: 'Standard',
          capacity: 0
        }
      };
      await setDocument('solarData', userId, defaultData);
      return defaultData;
    }
    return solarData;
  } catch (error) {
    console.error('Error getting user solar data:', error);
    throw error;
  }
};

export const getUserReferrals = async (userId: string) => {
  try {
    const referrals = await queryDocuments('referrals', 'referrerId', '==', userId);
    return referrals;
  } catch (error) {
    console.error('Error getting user referrals:', error);
    throw error;
  }
};

export const createSupportTicket = async (data: any) => {
  try {
    return await addDocument('supportTickets', {
      ...data,
      status: 'Open',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating support ticket:', error);
    throw error;
  }
};

export const getUserSupportTickets = async (userId: string) => {
  try {
    return await queryDocuments('supportTickets', 'userId', '==', userId);
  } catch (error) {
    console.error('Error getting user support tickets:', error);
    throw error;
  }
};
