
import {EDITIONS_SIZES} from '@/constants/common'


export interface FormValues {
  name: string;
  symbol: string;
  description: string;
  media: string | null;
  editionSize: {
    type: EDITIONS_SIZES;
    amount: string;
  },
  validity: {
    start: string | null;
    end: string | null;
  }
  price: string;
  mintLimitPerAddress: string;
  payoutAddress: string;
}