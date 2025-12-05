export interface PositionCreatePayload {
  name: string
  description: string
  max_candidates: number
  election_uuid: string
}

export interface PositionUpdatePayload {
  name?: string
  description?: string
  max_candidates?: number
}

export interface Position {
  uuid: string
  name: string
  description: string
  order_index: number
  max_candidates: number
  election_id: string
}

