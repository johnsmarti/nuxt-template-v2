interface Election {
  uuid: string;
  title: string;
  description: string;
  status: string;
  date_start: string;
  date_end: string;
}

interface ElectionCreatePayload {
  title: string;
  description: string;
  date_start: string;
  date_end: string;
  max_votes_per_voter: number;
  allow_abstention: boolean;
  results_visibility: string;
  election_type: string;
}

export type { Election, ElectionCreatePayload };
