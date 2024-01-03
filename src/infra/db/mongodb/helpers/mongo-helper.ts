import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string | undefined): Promise<void> {
    this.client = await MongoClient.connect(uri || 'mongodb://localhost:27017/clean-node-api')
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any, result: any): any => {
    return { id: result.insertedId.toString(), ...collection }
  }
}
