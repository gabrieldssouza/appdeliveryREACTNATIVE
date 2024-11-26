import React, { useEffect, useRef } from 'react';
import { View, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

const Banner: React.FC = () => {
  const pagerRef = useRef<PagerView>(null);
  const bannerImages = [
    require('../../assets/banner1.png'),
    require('../../assets/banner2.png'),
  ];

  useEffect(() => {
    let currentPage = 0;
    const interval = setInterval(() => {
      if (pagerRef.current) {
        const nextPage = (currentPage + 1) % bannerImages.length;
        pagerRef.current.setPage(nextPage);
        currentPage = nextPage;
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <View className='w-full h-36 md:h-60 rounded-2xl mt-5 mb-4'>
      <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0} pageMargin={14}>
        {bannerImages.map((image, index) => (
          <Pressable
            className='w-full h-36 rounded-2xl md:h-60'
            key={index.toString()}
            onPress={() => console.log(`Banner ${index + 1}`)}
          >
            <Image
              source={image}
              className='w-full h-36 rounded-2xl md:h-60'
            />
          </Pressable>
        ))}
      </PagerView>
    </View>
  );
};

export default Banner;