import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import ListBox from "../../../Components/ListBox";
import TopHeader from "../../../Components/TopHeader";
import ComponentsStyles from "../../../Constants/ComponentsStyles";
import { Notification } from "../../../Constants/DummyData";
const NotificationScreen = () => {

    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
              <TopHeader
                HeaderText="Notification"
                Is_subtext={false}
                is_menu={false}
                Is_Search={false}
            />
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={Notification}
                style={{ marginTop: 10, marginBottom: 65, }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ padding: 5, marginBottom: 5 }}>
                            <ListBox
                                headerType={item.title}
                                date={item.dateTime}
                                isanyIcon={true}
                                anyIconName="close-circle"
                            />
                        </View>
                    );
                }}
                keyExtractor={item => `${item.id}`}
            />
        </SafeAreaView>
    );

}
export default NotificationScreen;