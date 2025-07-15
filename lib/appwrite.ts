import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "@/lib/type";

export const writeConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.nextechsolution",
  databaseId: "68715dd700105277eddb",
  userCollectionId: "6871f72a00085ae8cbfd",
};
export const client = new Client();
client
  .setEndpoint(writeConfig.endpoint!)
  .setProject(writeConfig.projectId!)
  .setPlatform(writeConfig.platform!);

export const account = new Account(client);
export const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;
    await signIn({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);
    return await database.createDocument(
      writeConfig.databaseId,
      writeConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl },
    );
  } catch (e) {
    throw new Error(e as string);
  }
};
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (e) {
    throw new Error(e as string);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await database.listDocuments(
      writeConfig.databaseId,
      writeConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (e) {
    throw new Error(e as string);
  }
};
