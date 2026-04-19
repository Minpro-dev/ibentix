export interface Review {
  id: string;
  title: string;
  venue: string;
  rating: number;
  date: string;
  comment: string;
  image: string;
  price?: number;
  status: 'Published' | 'Pending' | 'Rejected';
}

export interface User {
  name: string;
  role: string;
  avatar: string;
  impact: {
    helpfulVotes: number;
    avgRating: number;
    reviewPoints: string;
    topPercentage: number;
  };
}
