import AsyncStorage from "@react-native-async-storage/async-storage";
import { NetworkInfo } from "react-native-network-info";

const MAX_REQUESTS = 20;
const TIME_WINDOW = 60 * 1000; // 60 seconds (1 minute)
const MIN_INTERVAL = 500; // 0.5 seconds (500 milliseconds)

async function getIpAddress(): Promise<string> {
    return await NetworkInfo.getIPAddress();
}

export async function checkRateLimit(): Promise<boolean> {
    "use server";
    try {
        const ipAddress = await getIpAddress();
        if (!ipAddress) return false;

        const currentTime = Date.now();
        const requestTimesJson = await AsyncStorage.getItem(`rate_limit_${ipAddress}`);
        let requestTimes: number[] = requestTimesJson ? JSON.parse(requestTimesJson) : [];

        // Ensure requestTimes is an array and filter out invalid values
        if (!Array.isArray(requestTimes)) {
            requestTimes = [];
        }

        // Filter out requests that are outside the time window
        requestTimes = requestTimes.filter(time => typeof time === "number" && currentTime - time < TIME_WINDOW);

        if (requestTimes.length >= MAX_REQUESTS) {
            return false; // Rate limit exceeded
        }

        // Ensure at least 0.5 seconds have passed since the last request
        if (requestTimes.length > 0 && currentTime - requestTimes[requestTimes.length - 1] < MIN_INTERVAL) {
            return false; // Too soon since last request
        }

        // Add new request timestamp and store it
        requestTimes.push(currentTime);
        await AsyncStorage.setItem(`rate_limit_${ipAddress}`, JSON.stringify(requestTimes));

        return true;
    } catch (e) {
        console.error("Rate limit check failed:", e);
        return false;
    }
}
