import {Message} from './types';
import fs from 'fs';

class MessageService {

    private messages: string[];
    private currentMessage: Message;
    private currentIndex: number;
    private stateFile = 'message-state.json';

    constructor() {
        this.messages = [
            "Rise and shine, beautiful! Your smile is the sunshine that lights up my world. 🤗 💜",
            "Good morning, my love! Waking up to thoughts of you brightens my day.",
            "As the sun rises, so does my love for you. Good morning, sweetheart!",
            "Another day to cherish the love we share. Good morning, my one and only.",
            "Wake up, sleepyhead! Your presence makes every morning magical.",
            "Sending you a morning kiss to start your day with warmth and love.",
            "Good morning, sweetheart! May your day be as lovely as your smile.",
            "My day begins with thoughts of you. Good morning, my love!",
            "Rise and sparkle! You're the brightest star in my morning sky.",
            "Good morning, gorgeous! Each day with you is a blessing.",
            "Wake up to the melody of my heart saying, I love you. Good morning princess",
            "Sunrises are even more beautiful with you in my life. Good morning, love!",
            "Good morning, my sunshine! Your love is the fuel for my day.",
            "Start your day with a cup of coffee and a heart full of love. Good morning sunshine",
            "Wishing my favorite person a day as amazing as you are. Good morning sunshine",
            "Rise and shine, my love! Your presence makes everything brighter.",
            "Good morning, sweetheart! Here's to a day filled with love and laughter.",
            "Wake up with a smile, for your smile is my favorite sight. Good morning sunshine",
            "Good morning, love! Each moment with you is a page from a beautiful story.",
            "Sending you hugs and kisses to kickstart your day. Good morning sunshine",
            "Rise and dazzle, my queen! Your radiance lights up the world.",
            "Good morning, my love! May your day be as special as you are to me.",
            "Another day, another chance to express my love for you. Good morning sunshine",
            "Wake up, sleepy princess! Your knight in shining armor is here. Good morning sunshine",
            "Good morning, beautiful! Your love is the sweetest melody of my life.",
            "Rise and love, my dearest! Each morning with you is a blessing.",
            "Wishing you a day filled with joy, laughter, and all the love in the world. Good morning sunshine",
            "Good morning, sunshine! Your love is the warmth that keeps me going.",
            "Wake up to a day filled with love, laughter, and endless possibilities. Good morning sunshine",
            "Rise and shine, my love! Your presence makes everything better.",
            "Good morning, sweetheart! May your day be as wonderful as your love is to me.",
            "Start your day with a smile, knowing you are loved beyond words. Good morning sunshine",
            "Another day, another chance to be with the one I love. Good morning sunshine",
            "Wake up, my love! The world is a better place with you in it. Good morning sunshine",
            "Good morning, beautiful! Your love is the anchor that holds me steady.",
            "Rise and radiate, my sunshine! Your light brightens up my darkest days.",
            "Wishing you a morning as lovely as the love we share. Good morning sunshine",
            "Good morning, sweetheart! Your love is the best part of my day.",
            "Wake up, my love! Each day with you is a new chapter of happiness.",
            "Rise and enchant, my queen! Your presence is pure magic. Good morning sunshine",
            "Good morning, love! May your day be filled with the warmth of our love.",
            "Start your day with a smile, for your smile is my greatest treasure. Good morning sunshine",
            "Another day to fall in love with you all over again. Good morning, my darling!",
            "Wake up, sleepyhead! Your dreams are my favorite stories. Good morning sunshine",
            "Good morning, my love! Your laughter is the sweetest melody in the morning breeze.",
            "Rise and shine, my dearest! Your love is the sunshine in my heart.",
            "Wishing you a day as bright and beautiful as your spirit. Good morning sunshine",
            "Good morning, sweetheart! Your love is the inspiration behind my every smile.",
            "Wake up, my love! Today is another chance to create beautiful memories together.",
            "Rise and rejoice, my sunshine! Your love is a blessing beyond measure. Good morning sunshine",
            "Good morning, love! May your day be as amazing as the love we share.",
            "Start your day with gratitude for the love that fills our hearts. Good morning sweetheart",
            "Another day, another opportunity to cherish the love we have. Good morning sunshine",
            "Wake up, my love! Your presence is the key to a day filled with joy and love.",
            "Good morning, beautiful! Your love is the sunshine that brightens my darkest hours.",
            "Rise and love, my darling! Each morning with you is a promise of a beautiful day.",
            "Good morning, my love! The world feels brighter with you in it.",
            "Rise and shine, beautiful! Your love is the masterpiece that colors my life.",
            "Wake up, sleepyhead! Your dreams are woven with the magic of our love.",
            "Another day, another chance to be grateful for the love we share. Good morning sunshine",
            "Good morning, sweetheart! Your presence is the harmony in the song of my heart.",
            "Start your day with a cup of love and a sprinkle of my affection. Good morning sunshine",
            "Wishing you a morning as sweet as the first sip of coffee and as warm as your embrace.",
            "Rise and dazzle, my queen! Your radiance is the beacon that guides me.",
            "Good morning, my love! May your day be filled with joy and unexpected delights.",
            "Wake up, my sunshine! Your laughter is the melody that echoes in my heart.",
            "Another day to create memories and share moments of love. Good morning sunshine",
            "Good morning, beautiful! Your love is the canvas where I paint my happiness.",
            "Rise and enchant, my dearest! Your presence turns ordinary moments into extraordinary memories.",
            "Wishing you a morning filled with the fragrance of love and the warmth of our connection.",
            "Good morning, love! Your smile is the sunrise that brightens my every day.",
            "Wake up, my love! Today is a canvas waiting for the strokes of our love story.",
            "Start your day with a whisper of love and a promise of everlasting happiness. Good morning sunshine",
            "Another day to cherish the bond that grows between us. Good morning, sweetheart!",
            "Good morning, my sunshine! Your love is the compass that guides me through each day.",
            "Rise and rejoice, my darling! Your presence is the greatest gift of my mornings.",
            "Wishing you a morning as beautiful as the dreams we share. Good morning sunshine",
            "Good morning, love! Your love is the melody that plays in the symphony of my heart.",
            "Wake up, sleepyhead! Your warmth is the blanket that comforts my soul.",
            "Another day to fall in love with the way you make my heart skip a beat. Good morning sunshine",
            "Good morning, sweetheart! Your love is the anchor that keeps me grounded.",
            "Rise and glow, my queen! Your presence illuminates the darkest corners of my thoughts.",
            "Wishing you a day filled with moments that make your heart dance. Good morning sunshine",
            "Good morning, my love! Your love is the potion that makes every day enchanting.",
            "Wake up, my sunshine! Your radiance brightens the path of my journey.",
            "Another day, another opportunity to express my love for you. Good morning sunshine",
            "Good morning, beautiful! Your love is the melody that plays in the symphony of my heart.",
            "Start your day with the knowledge that you are the muse of my every joy. Good morning sunshine",
            "Rise and enchant, my dearest! Your love transforms the ordinary into the extraordinary.",
            "Wishing you a morning as delightful as the moments we've shared together. Good morning sunshine",
            "Good morning, love! Your presence is the spark that ignites the fire of my day.",
            "Wake up, my love! Today is a new chapter in our love story waiting to be written.",
            "Another day to fall in love with you all over again. Good morning, my darling!",
            "Good morning, sweetheart! Your love is the compass that guides me through each day.",
            "Rise and shine, my queen! Your love is the crown that adorns my heart.",
            "Wishing you a morning filled with the warmth of our love and the promise of a beautiful day. Good morning sunshine",
            "Good morning, my sunshine! Your love is the melody that plays in the symphony of my heart.",
            "Wake up, my love! Your presence is the sunshine that brightens my every day.",
            "Another day, another opportunity to create beautiful memories together. Good morning sunshine",
            "Good morning, beautiful! Your love is the brushstroke that paints my world in vibrant colors.",
            "Rise and dazzle, my dearest! Your radiance is the light that guides me through the day.",
            "Wishing you a morning as sweet as your kisses and as magical as our love. Good morning sunshine",
            "Good morning, love! Your laughter is the music that fills the air with joy.",
            "Wake up, my love! Today is another chance to cherish the love we have. Good morning sunshine",
            "Another day to fall in love with the way you make my heart skip a beat. Good morning sunshine",
            "Good morning, sweetheart! Your love is the anchor that grounds me in happiness.",
            "Good morning, my love! Your presence turns ordinary moments into extraordinary memories.",
            "Rise and shine, beautiful! Your love is the melody that plays in the background of my thoughts.",
            "Wake up, sleepyhead! Your dreams are a canvas where we paint the colors of our future together.",
            "Another day to be grateful for the love that grows between us. Good morning sunshine",
            "Good morning, sweetheart! Your laughter is the sweetest symphony in the morning air.",
            "Start your day with a smile, knowing you are the reason for the joy in my heart. Good morning sunshine",
            "Wishing you a morning as warm as your hugs and as comforting as your presence.",
            "Rise and enchant, my dearest! Your love is the spell that makes every moment magical.",
            "Good morning, love! Your kisses are the sweetest nectar that fuels my day.",
            "Wake up, my sunshine! Your light guides me through the darkest nights of life.",
            "Another day, another opportunity to express my love for you in a million ways. Good morning sunshine",
            "Good morning, beautiful! Your love is the compass that leads me in the right direction.",
            "Rise and radiate, my queen! Your presence makes everything in life more vibrant.",
            "Wishing you a morning as lovely as the petals of a rose and as sweet as its fragrance. Good morning sunshine",
            "Good morning, my love! Your love is the poem that my heart recites every morning.",
            "Wake up, my love! Today is a blank canvas waiting for the strokes of our shared dreams.",
            "Another day to fall deeper in love with the incredible person you are. Good morning sunshine",
            "Good morning, sweetheart! Your love is the key that unlocks the door to my happiness.",
            "Rise and glow, my darling! Your presence lights up my world in the most beautiful way.",
            "Wishing you a morning filled with the laughter of joy and the warmth of our connection. Good morning sunshine",
            "Good morning, love! Your love is the melody that plays in the soundtrack of my life.",
            "Good morning to the most incredible person I know.",
            "Another day to cherish the love we have and create countless memories. Good morning sunshine",
            "Good morning, beautiful! Your love is the thread that weaves the fabric of our shared journey.",
            "Rise and dazzle, my dearest! Your radiance is the light that brightens my darkest days.",
            "Wishing you a morning as serene as the sunrise and as filled with promise as a new day. Good morning sunshine",
            "Good morning, my love! Your love is the melody that plays in the symphony of my heart.",
            "Wake up, my sunshine! Your warmth is the embrace that keeps away the morning chill.",
            "Another day, another opportunity to make you feel as special as you are to me. Good morning sunshine",
            "Good morning, sweetheart! Your love is the potion that makes every day enchanting.",
            "Rise and shine, my queen! Your love is the crown that adorns my heart with joy.",
            "Wishing you a morning filled with the fragrance of love and the promise of a beautiful day. Good morning sunshine",
            "Good morning, my sunshine! Your love is the melody that plays in the symphony of my heart.",
            "Wake up, my love! Your presence is the sunshine that brightens my every day.",
            "Another day, another opportunity to create beautiful memories together. Good morning sunshine",
            "Good morning, beautiful! Your love is the brushstroke that paints my world in vibrant colors.",
            "Rise and dazzle, my dearest! Your radiance is the light that guides me through the day.",
            "Wishing you a morning as sweet as your kisses and as magical as our love. Good morning sunshine",
            "Good morning, love! Your laughter is the music that fills the air with joy.",
            "Wake up, my love! Today is another chance to cherish the love we have. Good morning sunshine",
            "Another day to fall in love with the way you make my heart skip a beat. Good morning sunshine",
            "Good morning, sweetheart! Your love is the anchor that grounds me in happiness.",
            "Rise and shine, my queen! Your love is the spark that ignites the fire of my day.",
            "Wishing you a morning filled with moments that make your heart dance. Good morning sunshine",
            "Good morning, my love! Your presence is the spark that sets my day ablaze with joy.",
            "Wake up, my sunshine! Your radiance brightens the path of my journey.",
            "Another day, another opportunity to express my love for you. Good morning sunshine",
            "Good morning, beautiful! Your love is the melody that plays in the symphony of my heart.",
            "Rise and enchant, my dearest! Your love transforms the ordinary into the extraordinary.",
            "Wishing you a morning as delightful as the moments we've shared together. Good morning sunshine",
            "🌅 Good morning, my love! Your presence turns ordinary moments into extraordinary memories.",
            "☀️ Rise and shine, beautiful! Your love is the melody that plays in the background of my thoughts.",
            "😴 Wake up, sleepyhead! Your dreams are a canvas where we paint the colors of our future together.",
            "1🌟 Another day to be grateful for the love that grows between us. Good morning sunshine",
            "💖 Good morning, sweetheart! Your laughter is the sweetest symphony in the morning air.",
            "😊 Start your day with a smile, knowing you are the reason for the joy in my heart. Good morning sunshine",
            "🌹 Wishing you a morning as warm as your hugs and as comforting as your presence.",
            "✨ Rise and enchant, my dearest! Your love is the spell that makes every moment magical.",
            "💋 Good morning, love! Your kisses are the sweetest nectar that fuels my day.",
            "1🌞 Wake up, my sunshine! Your light guides me through the darkest nights of life.",
            "1🌈 Another day, another opportunity to express my love for you in a million ways. Good morning sunshine",
            "🌼 Good morning, beautiful! Your love is the compass that leads me in the right direction.",
            "🌌 Rise and radiate, my queen! Your presence makes everything in life more vibrant.",
            "🌸 Wishing you a morning as lovely as the petals of a rose and as sweet as its fragrance. Good morning sunshine",
            "💌 Good morning, momma! Your love is the poem that my heart recites every morning.",
            "🎨 Wake up, my love! Today is a blank canvas waiting for the strokes of our shared dreams.",
            "🌠 Another day to fall deeper in love with the incredible person you are. Good morning sunshine",
            "🗝️ Good morning, sweetheart! Your love is the key that unlocks the door to my happiness.",
            "💫 Rise and glow, my darling! Your presence lights up my world in the most beautiful way.",
            "🌻 Wishing you a morning filled with the laughter of joy and the warmth of our connection. Good morning sunshine",
            "Good morning, sunshine! Your love is the melody that plays in the soundtrack of my life.",
            "Good morning sunshine. I just wanted to let you know that I might fail a million times, but as long as you’re in my life, I’ve succeeded where it matters most.",
            "Another day to cherish the love we have and create countless memories. Good morning sunshine",
            "Good morning, beautiful! Your love is the thread that weaves the fabric of our shared journey.",
            "Rise and dazzle, my dearest! Your radiance is the light that brightens my darkest days. 🌅",
            "Wishing you a morning as serene as the sunrise and as filled with promise as a new day. Good morning sunshine",
            " Good morning, my love! Your love is the melody that plays in the symphony of my heart.",
            "☀️ Wake up, my sunshine! Your warmth is the embrace that keeps away the morning chill.",
            "🌟 Another day, another opportunity to make you feel as special as you are to me. Good morning sunshine",
            "🍀 Good morning, sweetheart! Your love is the potion that makes every day enchanting.",
            "👑 Rise and shine, my queen! Your love is the crown that adorns my heart with joy.",
            "🌹 Wishing you a morning filled with the fragrance of love and the promise of a beautiful day. Good morning sunshine",
            "Good morning, my sunshine! Your love is the melody that plays in the symphony of my heart.",
            "☀️ Wake up, my love! Your presence is the sunshine that brightens my every day.",
            "Another day, another opportunity to create beautiful memories together. Good morning sunshine",
            "Good morning, beautiful! Your love is the brushstroke that paints my world in vibrant colors.",
            "✨ Rise and dazzle, my dearest! Your radiance is the light that guides me through the day.",
            "Wishing you a morning as sweet as your kisses and as magical as our love. Good morning sunshine",
            "Good morning, love! Your smile is the music that fills the air with joy.",
            "☀️ Wake up, my love! Today is another chance to cherish the love we have. Good morning sunshine",
            "🌈 Another day to fall in love with the way you make my heart skip a beat. Good morning sunshine",
            "🗝️ Good morning, sweetheart! Your love is the anchor that grounds me in happiness.",
            "Rise and shine, my queen! Your love is the spark that ignites the fire of my day.",
            "Wishing you a morning filled with moments that make your heart dance. Good morning sunshine",
            "🌞 Good morning, my love! Your presence is the spark that sets my day ablaze with joy.",
            "☀️ Wake up, my sunshine! Your radiance brightens the path of my journey.",
            "🌟 Another day, another opportunity to express my love for you. Good morning sunshine",
            "Good morning, beautiful! Your love is the melody that plays in the symphony of my heart.",
            "💖 Rise and enchant, my dearest! Your love transforms the ordinary into the extraordinary.",
            "🌷 Wishing you a morning as delightful as the moments we've shared together. Good morning sunshine",
            "🌅 Good morning, my love! As the sun rises, your beauty illuminates my world, and I can't help but feel incredibly lucky to wake up to you each day.",
            "☀️ Rise and shine, beautiful! Your radiance outshines the morning sun, and I'm grateful for the warmth your love brings to my heart.",
            "Wake up, sleepyhead! Your dreams are filled with the enchanting beauty that mirrors the reality of having you in my life. Good morning sunshine",
            "🌟 Another day to be grateful for the masterpiece that is you. Your beauty is an art I get to admire every morning. Good morning, sweetheart!",
            "💖 Good morning, my love! Your laughter is like the sweetest melody, and I'm lucky to be the one waking up to the music of your joy.",
            "😊 Start your day with a smile, knowing that you are the reason for the happiness that fills my heart. Good morning sunshine",
            "🌹 Wishing you a morning as beautiful as your soul and as captivating as the love we share. Good morning, my dazzling queen!",
            "✨ Rise and enchant, my dearest! Your beauty is magical, and I feel like the luckiest person to be captivated by it every day.",
            "💋 Good morning, love! Your kisses are the sweetest, making me feel fortunate to have your love in my life.",
            "🌞 Wake up, my sunshine! Your light guides me through each day, and I can't help but feel blessed to be on this journey with you.",
            "🌈 Another day, another opportunity to express my gratitude for the incredible person you are. Good morning sunshine",
            "🌼 Good morning, beautiful! Your love is the compass that leads me in the right direction, and I am so lucky to follow it.",
            "Rise and radiate, my queen! Your presence makes everything in life more vibrant, and I cherish each moment with you.",
            "🌸 Wishing you a morning as lovely as the petals of a rose and as sweet as its fragrance. Good morning, my blooming flower!",
            "💌 Good morning, my love! Your love is the poetry my heart recites, and I am lucky to be the audience of such a beautiful symphony.",
            "🎨 Wake up, my love! Today is a blank canvas waiting for the strokes of our shared dreams, and I can't wait to create with you.",
            "🌠 Another day, another chance to fall deeper in love with the incredible person you are. Good morning sunshine",
            "🗝️ Good morning, sweetheart! Your love is the key that unlocks the door to my happiness, and I feel so fortunate to hold it.",
            "💫 Rise and glow, my darling! Your presence lights up my world, and I can't believe how lucky I am to have you.",
            "🌻 Wishing you a morning filled with the laughter of joy and the warmth of our connection. Good morning, my joyous love!",
            "Good morning, love! Your love is the melody that plays in the soundtrack of my life, and it's the sweetest music to my ears.",
            "Good morning Sunshine, Just wanted to remind you are capable of greatness. ",
            "Another day to cherish the love we have and create countless memories. Good morning, my memory-making muse!",
            "Good morning, beautiful! Your love is the thread that weaves the fabric of our shared journey, and I feel lucky to be woven into it.",
            "🌅 Rise and dazzle bby girl! Your radiance is the light that brightens my darkest days, and I'm lucky to have you as my sunshine.",
            "Wishing you a morning as serene as the sunrise and as filled with promise as a new day. Good morning, my promising love!",
            "Good morning, my love! Your love is the melody that plays in the symphony of my heart, and it's a beautiful composition.",
            "☀️ Wake up, my sunshine! Your warmth is the embrace that keeps away the morning chill, and I feel lucky to be wrapped in it.",
            "🌟 Another day, another opportunity to make you feel as special as you are to me. Good morning, my incredibly special love!",
            "🍀 Good morning, sweetheart! Your love is the potion that makes every day enchanting, and I'm enchanted by you.",
            "👑 Rise and shine, my queen! Your love is the crown that adorns my heart with joy, and I feel like royalty to have you.",
            "🌹 Wishing you a morning filled with the fragrance of love and the promise of a beautiful day. Good morning, my fragrant flower!",
            "Good morning, my sunshine! Your love is the melody that plays in the symphony of my heart, and it's a beautiful composition.",
            "Wake up, my love! Your presence is the sunshine that brightens my every day, and I feel lucky to bask in it.",
            "Another day, another opportunity to create beautiful memories, you're the highlight of my day Good morning, my memory-making muse!",
            "Good morning, beautiful! Your love is the brushstroke that paints my world in vibrant colors, and I'm in awe of the masterpiece.",
            "✨ Rise and dazzle, my dearest! Your radiance is the light that guides me through the day, and I'm lucky to be led by you.",
            "Wishing you a morning as sweet as your kisses and as magical as our love. Good morning, my sweet enchantress!",
            "Good morning, love! Your laughter is the music that fills the air with joy, and I'm lucky to dance to its rhythm.",
            "☀️ Wake up, my love! Today is another chance to cherish the love we have. Good morning, my cherished one!",
            "Another day to fall in love with the way you make my heart skip a beat. Good morning, my heart-skipping love!",
            "Good morning, sweetheart! Your love is the anchor that grounds me in happiness, and I feel secure in your love.",
            "Rise and shine, my queen! Your love is the spark that ignites the fire of my day, and I'm lucky to be warmed by it.",
            "Wishing you a morning filled with moments that make your heart dance. Good morning, my dazzling queen!",
            "Good morning, my love! Your presence is the spark that sets my day ablaze with joy, and I'm lucky to be ignited by you.",
            "Wake up, my sunshine! Your radiance brightens the path of my journey, and I'm lucky to have you as my guiding light.",
            "Another day, another opportunity to express my love for you. Good morning, my expressive love!",
            "Good morning, beautiful! Your love is the palette that colors my world, and I'm lucky to be painted by the strokes of your affection.",
            "💖 Rise and shine, my love! Your beauty is like a sunrise, bringing warmth and joy to my soul. I feel incredibly fortunate to witness it every day.",
            "🌺 Wake up, my sweet blossom! Your presence is a garden of love, and I'm lucky to be surrounded by the fragrance of your affection.",
            "Another day, another chance to fall deeper into the ocean of your love. Good morning, my ocean of emotions!",
            "Good morning, sweetheart! Your love is the melody that plays in my heart, creating a harmonious symphony of happiness.🌷",
            "🌄 Wishing you a morning as breathtaking as the view of your beauty. Good morning, my breathtaking muse!",
            "🌼 Good morning, my love! Your laughter is the sunshine that dispels the clouds of any gloom, and I'm lucky to be in your light.",
            "🌞 Wake up, my sunshine! Your rays of love brighten my darkest moments, and I feel blessed to be warmed by your affection.",
            "🌹 Another day, another opportunity to express my love for the most extraordinary person in my life. Good morning, my extraordinary love!",
            "Good morning, melody of my heart! Your beauty is the music that resonates within me, and I'm lucky to be tuned into your love.",
            "💑 Rise and shine, my forever! Your love is the eternity I want to wake up to, and I feel fortunate to have you by my side.",
            "🌟 Wishing you a morning as magical as the love we share. Good morning, my magical enchantress!",
            "Good morning, my love! Your presence is like a gentle breeze, refreshing and invigorating, and I'm lucky to breathe in your essence.",
            "Wake up, my sunrise! Your warmth is the first light that kisses my day, and I'm grateful for the dawn of your love.",
            "Another day, another opportunity to be captivated by your grace. Good morning, my captivating queen!",
            "Good morning, my love! Your beauty is like a rare gem, and I'm lucky to have found the treasure of your heart.",
            "💖 Rise and shine, my love! Your love is the spark that ignites the flame of passion within me, and I feel lucky to be ablaze with your affection.",
            " Wishing you a morning as serene as your presence and as tranquil as the love we share. Good morning, my serene soulmate!",
            "Good morning, my love! Your laughter is the melody that brings joy to my world, and I'm lucky to be part of your symphony.🌹",
            "Wake up, my artist of love! Your beauty is a canvas painted with the colors of affection, and I'm lucky to be the subject of your masterpiece.",
            "Another day, another chance to be mesmerized by the magic of your love. Good morning, my enchanting muse!",
            "Good morning, sweetheart! Your love is the bridge that connects our hearts, and I feel lucky to walk this journey hand in hand with you.",
            "Rise and radiate, my queen! Your presence illuminates my life, and I'm lucky to bask in the glow of your love.",
            "Wishing you a morning as splendid as your smile. Good morning, my splendid source of joy!",
            "Good morning, my love! Your laughter is the sweetest melody, and I'm lucky to dance to its rhythm every day.",
            "Wake up, my heart! Your love is the rhythm that beats in my chest, and I feel fortunate to share this heartbeat with you.💘",
            "Another day, another opportunity to be grateful for the beauty you bring into my life. Good morning, my source of gratitude!",
            "Good morning, my love! Your beauty is the sunrise that paints the canvas of my day with warmth and color.",
            "Rise and shine, beautiful! Your radiance outshines the morning sun, and I'm grateful to wake up to your brilliance.",
            "Wake up, sleepyhead! Your dreams are a reflection of the beauty that fills your heart, and I'm lucky to be a part of them.",
            "Another day to be grateful for the breathtaking beauty that is you. Good morning, my stunning muse!",
            "Good morning, my love! Your laughter is the melody that sets the tone for a day filled with joy and love.💖",
            "Start your day with a smile, knowing that you are the reason for the happiness that radiates from my heart. Good morning sunshine",
            "Wishing you a morning as lovely as your soul and as captivating as the love we share. Good morning, my captivating enchantress!",
            "Rise and enchant, my dearest! Your beauty is like a spell, and I'm enchanted by you more and more each day.",
            "💋 Good morning, love! Your kisses are the sweetest, and I'm lucky to savor their sweetness every day.",
            "Wake up, my sunshine! Your light guides me through each day, and I'm grateful for the warmth your love brings.",
            "Another day, another opportunity to express my gratitude for the masterpiece that is you. Good morning, my living work of art!",
            "Good morning, beautiful! Your love is the compass that leads me in the right direction, and I feel blessed to follow it.",
            "Rise and radiate, my queen! Your presence makes everything in life more vibrant, and I cherish each moment with you.",
            "🌸 Wishing you a morning as beautiful as the petals of a rose and as sweet as its fragrance. Good morning, my blooming flower!",
            "Good morning, my love! Your love is the poetry my heart recites, and I am lucky to be the audience of such a beautiful symphony.",
            "Wake up, my love! Today is a blank canvas waiting for the strokes of our shared dreams, and I can't wait to create with you.",
            "Another day, another chance to fall deeper in love with the incredible person you are. Good morning, my ever-inspiring love!",
            "🗝️ Good morning, sweetheart! Your love is the key that unlocks the door to my happiness, and I feel so fortunate to hold it.",
            "Rise and glow, primrose! Your presence lights up my world in the most beautiful way, and I'm grateful for the light you bring.",
            "Wishing you a morning filled with the laughter of joy and the warmth of our connection. Good morning, my joyous love!",
            "Good morning, beautify! Your love is the melody that plays in the soundtrack of my life, and it's the sweetest music to my ears.",
            "Wake up, my love! Today is another chapter in our love story, waiting to be written, and I'm grateful to be the author with you.",
            "Another day, another opportunity to cherish the love we have and create countless memories. Good morning, my memory-making muse!",
            "🧵 Good morning, beautiful! Your love is the thread that weaves the fabric of our shared journey, and I feel lucky to be woven into it.",
            "Rise and dazzle, my dearest! Your radiance is the light that brightens my darkest days, and I'm lucky to have you as my sunshine.",
            "Wishing you a morning as serene as the sunrise and as filled with promise as a new day. Good morning, my promising love!",
            "Good morning, my love! Your love is the melody that plays in the symphony of my heart, and it's a beautiful composition.",
            "Wake up, my sunshine! Your warmth is the embrace that keeps away the morning chill, and I feel lucky to be wrapped in it.",
            "Another day, another opportunity to make you feel as special as you are to me. Good morning, my incredibly special love!",
            "Good morning, sweetheart! Your love is the potion that makes every day enchanting, and I'm enchanted by you.",
            "I just wanted to say good morning to my favorite girl.",
            "Wishing you a morning filled with the fragrance of love and the promise of a beautiful day. Good morning, my fragrant flower!",
            "Good morning, my sunshine! Your love is the melody that plays in the symphony of my heart, and it's a beautiful composition.",
            "Wake up, my love! Your presence is the sunshine that brightens my every day, and I feel lucky to bask in it.",
            "I’m tired of texting you good morning. Let’s move in together so I can say it to your face.",
            "Good morning, beautiful! Your love is the brushstroke that paints my world in vibrant colors, and I'm in awe of the masterpiece.",
            "I’ve spent the night dreaming of you — and want to spend the whole day alongside you.",
            "Wishing you a morning as sweet as your kisses and as magical as our love. Good morning, my sweet enchantress!",
            "Good morning, love! Your laughter is the music that fills the air with joy, and I'm lucky to dance to its rhythm.",
            "Wake up, my love! Today is another chance to cherish the love we have. Good morning, my cherished one!",
            "Another day, another opportunity to fall in love with the way you make my heart skip a beat. Good morning, my heartbeat!",
            "Good morning, sweetheart! Your love is the anchor that grounds me in happiness, and I feel secure in your love.",
            "Rise and shine, my queen! You’re more beautiful than the sunrise outside my window.",
            "Wishing you a morning filled with moments that make your heart dance. Good morning, my dancing queen!",
            "Good morning, my love! Your presence is the spark that sets my day ablaze with joy, and I'm lucky to be ignited by you.",
            "Wake up, my sunshine! Your radiance brightens the path of my journey, and I'm lucky to have you as my guiding light.",
            "Another day, another opportunity to express my love for you. Good morning, my expressive love!",
            "Good morning, beautiful! Your love is the melody that plays in the symphony of my heart, and I'm enchanted by the tune.",
            "Rise and enchant, my dearest! Your love transforms the ordinary into the extraordinary, and I'm lucky to live in that magic.",
            "Wishing you a morning as delightful as the moments we've shared together. Good morning, my delightful love!",
            "Good morning, my love! Your beauty is like the sunrise, painting the sky with hues of love and warmth.",
            "Rise and shine, beautiful! Your radiance outshines the morning sun, and I'm grateful to bask in your glow.",
            "Wake up, sleepyhead! Your dreams are filled with the beauty that mirrors your soul, and I'm lucky to be a part of them.",
            "Another day to be grateful for the breathtaking beauty that is you. Good morning, my breathtaking muse!",
            "Good morning, my love! Your laughter is the melody that sets the tone for a day filled with joy and love.💖",
            "Start your day with a smile, knowing that you are the reason for the happiness that radiates from my heart. Good morning sunshine",
            "Wishing you a morning as lovely as your soul and as captivating as the love we share. Good morning, my captivating enchantress!",
            "Rise and enchant, my dearest! Your beauty is like a spell, and I'm enchanted by you more and more each day.",
            "Good morning, love! Your kisses are the sweetest, and I'm lucky to savor their sweetness every day.💋",
            "Good morning sunshine! Your light guides me through each day, and I'm grateful for the warmth your love brings.",
            "Another day, another opportunity to express my gratitude for the masterpiece that is you. Good morning, my living work of art!",
            "Good morning, beautiful! Your love is the compass that leads me in the right direction, and I feel blessed to follow it.",
            "Rise and radiate, my queen! Your presence makes everything in life more vibrant, and I cherish each moment with you.",
            "Wishing you a morning as beautiful as the petals of a rose and as sweet as its fragrance. Good morning, my blooming flower!",
            "Good morning, my love! Your love is the poetry my heart recites, and I am lucky to be the audience of such a beautiful symphony.",
            "Wake up, my love! Today is a blank canvas waiting for the strokes of our shared dreams, and I can't wait to create with you.",
            "Another day, another chance to fall deeper in love with the incredible person you are. Good morning, my ever-inspiring love!",
            "Good morning, sweetheart! Your love is the key that unlocks the door to my happiness, and I feel so fortunate to hold it.",
            "Rise and glow, my darling! Your presence lights up my world in the most beautiful way, and I'm grateful for the light you bring.",
            "A little note, short and true, just to say ‘Thinking about you’. Good morning Primrose.",
            "Good morning sunshine, I hope the years be good to us and all our hopes fulfill that every day that passes by shall find us closer still, Have a fruitful day/week ahead.",
            "So many of my memories include you, good morning my love",
            "Good morning sunshine, as you go about today, remember that; To Love is to receive a glimpse of heaven. Do have a beautiful day my queen.",
            "Good morning, my love! Your beauty is the sunrise that paints the sky with the colors of our shared dreams.",
            "Rise and shine, beautiful! Your radiance is the beacon that guides me through the dawn of each day, and I'm lucky to be guided by your light.",
            "Good morning to my favorite girl. I'm glad to have you in my life bby girl🫂!",
        ];

        this.currentMessage = {
            text: this.messages[0],
            lastUpdated: new Date(),
        };

        this.currentIndex = 0;
    }

    private formatDate(date: Date) : string {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",

        });
    }

    private shouldUpdateMessage(): boolean  {
        const now = new Date();
        const lastUpdate = this.currentMessage.lastUpdated;

        // Check if it's a new day and after 8 AM
        const isAfter8AM = now.getHours() >= 8;
        const isNextDay = now.getDate() !== lastUpdate.getDate();

        // Check if 24 hours have passed
        const hoursDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        const is24HoursPassed = hoursDiff >= 24;

        return (isNextDay && isAfter8AM) || is24HoursPassed;

        // --TODO For testing: Change 24 hours to 1 minute
        // const minutesDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
        // Will update after 1 minute
        // return minutesDiff >= 1;

    };

    private loadState() {
        try {
            const data = fs.readFileSync(this.stateFile, "utf8");
            const state = JSON.parse(data);
            // this.currentMessage = state.currentMessage;
            this.currentMessage = {
                ...state.currentMessage,
                lastUpdated: new Date(state.currentMessage.lastUpdated),
            }
            this.currentIndex = state.currentIndex;

        } catch (error) {
            console.error(error);
            this.saveState(); //create initial state if file is missing or invalid
        }
    }

    private saveState() {
        const state = {
            currentMessage: this.currentMessage,
            currentIndex: this.currentIndex,
        };
        fs.writeFileSync(this.stateFile, JSON.stringify(state));
    }

    public getAllMessages(): string[] {
        return [...this.messages];
    }

    public getMessage(): { text: string; lastUpdated: Date; formattedLastUpdated: string } {
        this.loadState();
        if (this.shouldUpdateMessage()) {
            this.currentIndex = (this.currentIndex + 1) % this.messages.length;
            this.currentMessage = {
                text: this.messages[this.currentIndex],
                lastUpdated: new Date(),
            };
            this.saveState();
        }
        return {
            text: this.currentMessage.text,
            lastUpdated: this.currentMessage.lastUpdated,
            formattedLastUpdated: this.formatDate(this.currentMessage.lastUpdated)
        };
    }

    public getMessageCount(): number {
        return this.messages.length;
    }

    public addMessage(message: string): void {
        if (!message.trim()) {
            throw new Error('Message cannot be empty');
        }
        this.messages.push(message);
    }

    public getCurrentMessageIndex(): number {
        return this.currentIndex;
    }

    public getLastUpdateTime(): {date: Date; formatted: string} {
        return {
            date: this.currentMessage.lastUpdated,
            formatted: this.formatDate(this.currentMessage.lastUpdated)
        };
    }

}

export const messageService = new MessageService();