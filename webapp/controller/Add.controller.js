sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (BaseController, JSONModel, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("hpc.so.zhpcsoapp.controller.Add", {

        onInit : function () {
            var oModel = new JSONModel();
            oModel.setData({
                orderdata: {
                    "BuyerId" : "",
                    "BuyerName" : "",
                    "To_Items" : [
                        {
                          "ProductId" : "",
                          "Note" : "",
                          "CurrencyCode" : "EUR",
                          "GrossAmount" : "0.00",
                          "Quantity" : "0",
                          "QuantityUnit" : "EA"
                        }
                      ]
                }
            });
            this.getView().setModel(oModel, "order");
            this.oModel = oModel;
        },
        onReset: function(){
            this.oModel.setProperty("/orderdata",{
                    "BuyerId" : "",
                    "BuyerName" : "",
                    "To_Items" : [
                        {
                          "ProductId" : "",
                          "Note" : "",
                          "CurrencyCode" : "EUR",
                          "GrossAmount" : "0.00",
                          "Quantity" : "0",
                          "QuantityUnit" : "EA"
                        }
                      ]
                }
            );
        },
        onDeleteRow: function(oEvent){
            //Step 1: We need the object of the ROW inside which we have BUTTON
            var oRow = oEvent.getSource().getParent();
            //Step 2: From the row object we get the element path = /To_Items/index
            var sPath = oRow.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            //Step 3: We will get data from model
            var aItems = this.oModel.getProperty("/orderdata/To_Items");
            //Step 4: Delete the data from model based on index
            aItems.splice(sIndex,1);
            //Step 5: Finally set the data back to the model
            this.oModel.setProperty("/orderdata/To_Items",aItems);
        },
        onAddRow: function(){
            var aItems = this.oModel.getProperty("/orderdata/To_Items");
            aItems.push({
                "ProductId" : "",
                "Note" : "",
                "CurrencyCode" : "EUR",
                "GrossAmount" : "0.00",
                "Quantity" : "0",
                "QuantityUnit" : "EA"
              });
              this.oModel.setProperty("/orderdata/To_Items",aItems);
        },
        onSave: function(){
            var orderData = this.oModel.getProperty("/orderdata");
            //Valudate Data
            if(orderData.BuyerId === ""){
                MessageBox.error("Please enter Buyer ID");
                return;
            }
            for (let i = 0; i < orderData.To_Items.length; i++) {
                const element = orderData.To_Items[i];
                if(element.ProductId === ""){
                    MessageBox.error("Please enter Product ID");
                    return;
                }
            }
            //Get The odata model object and send the post
            var oDataModel = this.getView().getModel();
            oDataModel.create("/OrderSet",orderData,{
                success: function(data){
                    var orderId = data.SoId;
                    MessageToast.show("Order " + orderId + " has been created successfully");
                },
                error: function(){
                    MessageToast.show("Error occurred");
                }
            });


        }

    });
});