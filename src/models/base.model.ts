class BaseModel {
    toObject() {
        return {
            ...this,
        }
    }
}

export default BaseModel
