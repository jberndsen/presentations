var app = angular.module("app", ["finance"]);

app.controller('TodoController', ['$scope', function ($scope) {
  $scope.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];

    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
}]);

app.controller('InvoiceController', ['currencyConverter', function(currencyConverter) {
  this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = currencyConverter.currencies;

  this.total = function total(outCurr) {
    return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
  };
}]);

angular.module('finance', []).factory('currencyConverter', function() {
  var currencies = ['USD', 'EUR', 'CNY'];
  var usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };
  var convert = function (amount, inCurr, outCurr) {
    return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
  };

  return {
    currencies: currencies,
    convert: convert
  };
});
