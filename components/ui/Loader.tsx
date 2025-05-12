import { Loader2 } from 'lucide-react'; // Optional icon lib
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="flex flex-col items-center  ">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className=""
            >
                <Loader2 className="h-5 w-5 animate-spin text-white" />
            </motion.div>

        </div>
    );
}
