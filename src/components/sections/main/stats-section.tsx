import {motion} from "framer-motion";

export default function StatsSection(){
    return(
        <motion.section
            className="relative z-10 py-16 px-4 lg:px-6"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        {number: "85%", label: "Reduced Wait Times"},
                        {number: "50+", label: "Happy Businesses"},
                        {number: "2k+", label: "Customers Served"},
                        {number: "99.9%", label: "Uptime Guarantee"}
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                        >
                            <div
                                className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                                {stat.number}
                            </div>
                            <div className="text-muted-foreground text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}