import { Connection, Model, Schema } from 'mongoose'
import { IRefreshTokens } from '../../interfaces/models'

const schemaName = 'RefreshTokens'
const RefreshTokensSchema: Schema<IRefreshTokens> = new Schema<IRefreshTokens>({
    tokens: {
        type: [String],
        default: null
    }
})

const RefreshTokensModel = (conn: Connection): Model<IRefreshTokens> => conn.model<IRefreshTokens>(schemaName, RefreshTokensSchema)

export default RefreshTokensModel