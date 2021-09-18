import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from './Themed';
import { ScrollView } from 'react-native-gesture-handler';

const baseUrl = 'https://api.spoonacular.com/recipes';
const apiKey = '05f3e5cbe3194079a0484c97fa512c66';

const safeEncodeURIComponent = (raw) =>
{
    return encodeURIComponent(raw).replace(/'/g, "%27");
}


const placeholderText = "Type a list of ingredients";

const RecipeSearch = props =>
{
    return (
        <View>
        </View>
    );
}

const Recipes = props =>
{
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const getRecipesFromQuery = async () => {
        try {
            if (query && query.toString().length > 0) {
              let apiUrl = `${baseUrl}/complexSearch?apiKey=${apiKey}&query=${query}`;
            
              console.log(`formed URL: ${apiUrl}`);
              const response = await fetch(apiUrl);
              const json = await response.json();
              console.log(json.results);
              setResults(json.results);
              setLoading(false);
            }
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setQuery}
          value={query}
          placeholder={placeholderText}
        />

        <Button title="Go!" style={styles.Button} onPress={async () => { setLoading(true); getRecipesFromQuery() }} />


        {isLoading ? <Text>Loading...</Text> :
        (
        <LinearGradient colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0)"]}>
            <ScrollView style={styles.scrollView}>
            <FlatList
                data={results}
                keyExtractor={ result => result.id.toString() }
                renderItem={({item}) => (
                    <View>
                      <Text style={styles.recipeName}>{item.title}</Text>
                      <Image resizeMode={'center'} style={styles.tinyLogo} source={{ uri: item.image.toString() }}></Image>
                    </View>
                )}
                />
            </ScrollView>
        </LinearGradient>)}
        </View>
    );
};
export default Recipes;
  
const styles = StyleSheet.create({
    tinyLogo: {
      width: 200,
      height: 200,
      alignItems: 'center',
      marginLeft: 270
    },
    getStartedText: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: 'center',
    },
    textInput: {
      color: 'white',
      fontSize: 50
    },
    Button: {paddingTop: '10px'},
    scrollView: {
      marginHorizontal: 20,
      width: 760,
      height: 480,
    },
    recipeName: {
      fontSize: 20,
      textAlign: 'center',
    }
  });