import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import CardCocktail from './cardCocktail/cardCocktail'
import * as apiService from '../../services/apiService';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Label, Input, Icon, Spinner } from 'native-base';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            searchText: '',
            isSearch: false,
            error: false,
            cocktailsReference: [],
            cocktailsResults: []
          }
    }
    renderCardsCocktails = (cocktailList) => {    
       return cocktailList.map((item, index) => {
            return (<TouchableOpacity key={item.id + index} onPress={() => Actions.detail({cocktailId: item.id })}>
                <CardCocktail cocktail={item}></CardCocktail>
            </TouchableOpacity>)
        })
    }
    componentDidMount = () => {
        apiService.getListRandomCocktail(9).then(data => {
          this.setState({ isLoading: false, cocktailsReference: data })
        }).catch(error => {
    
        })
    }

    handlerChange = (text) => {
        if(!text) {
            this.setState({ isSearch: false});
        }
        this.setState({ searchText: text})
    }

    handlerPressSearch = () => {
        
        if(this.state.searchText) {
            this.setState({isLoading: true, isSearch: true});
            apiService.getCocktailFilteredName(this.state.searchText).then(data => {
                this.setState({ isLoading: false, cocktailsResults: data, searchText: this.state.searchText})
            }).catch(error => {
        
            })
        }
    }
    render() {
        var content;
        if(this.state.isLoading) {
            return <Spinner color='blue' />
        } else {
            content = this.state.isSearch ? this.renderCardsCocktails(this.state.cocktailsResults) : this.renderCardsCocktails(this.state.cocktailsReference);
        }
        return (
        <Container>
            <Content>
                <Form>
                    <Item inlineLabel>
                        <Input defaultValue={this.state.searchText} placeholder="Buscar receta" onChangeText= { text => this.handlerChange(text)} />
                        <TouchableOpacity onPress={this.handlerPressSearch}>
                            <Label><Icon name='search' /></Label>
                        </TouchableOpacity>
                    </Item>
                </Form>
                <ScrollView>
                   {content}
                </ScrollView>
            </Content>
        </Container>
        );
  }
}