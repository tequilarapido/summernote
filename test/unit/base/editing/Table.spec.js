/**
 * Table.spec.js
 * (c) 2015~ Summernote Team
 * summernote may be freely distributed under the MIT license./
 */
/* jshint unused: false */
define([
  'chai',
  'jquery',
  'summernote/base/core/range',
  'summernote/base/editing/Table'
], function (chai, $, range, Table) {
  'use strict';

  var expect = chai.expect;

  describe('base:editing.Table', function () {
    var table = new Table();
    describe('tableWorker', function () {
      it('should create simple 1x1 table', function () {
        var resultTable = table.createTable(1, 1);
        expect(1).to.deep.equal(resultTable.rows.length);
        expect(1).to.deep.equal(resultTable.rows[0].cells.length);
      });

      it('should delete simple 1x1 table', function () {
        var $cont = $('<div class="note-editable"><table><tr><td>content</td></tr></table></div>');
        var $cell = $cont.find('td');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteTable(rng);
        expect('').to.deep.equal($cont.html());
      });

      it('should add simple row to table on top', function () {
        var $cont = $('<div class="note-editable"><table><tr><td>content</td></tr></table></div>');
        var $cell = $cont.find('td');
        var rng = range.create($cell[0].firstChild, 1);
        table.addRow(rng, 'top');
        expect('<table><tbody><tr><td><br></td></tr><tr><td>content</td></tr></tbody></table>').to.deep.equal($cont.html());
      });

      it('should add simple row to table on bottom', function () {
        var $cont = $('<div class="note-editable"><table><tr><td>content</td></tr></table></div>');
        var $cell = $cont.find('td');
        var rng = range.create($cell[0].firstChild, 1);
        table.addRow(rng, 'bottom');
        expect('<table><tbody><tr><td>content</td></tr><tr><td><br></td></tr></tbody></table>').to.deep.equal($cont.html());
      });

      it('should add simple row to table on top between two rows', function () {
        var htmlContent = '<div class="note-editable"><table><tr><td>content1</td></tr><tr><td id="td2">content2</td></tr></table></div>';
        var $cont = $(htmlContent);
        var $cell = $cont.find('#td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.addRow(rng, 'top');
        var resultTable = $('<table><tbody><tr><td>content1</td></tr></tbody></table>');
        $(resultTable).append('<tr><td><br/></td></tr>');
        $(resultTable).append('<tr><td id="td2">content2</td></tr>');
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';
        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should add simple row to table on bottom between two rows', function () {
        var baseTable = $('<table><tbody><tr><td id="td1">content1</td></tr></tbody></table>');
        $(baseTable).append('<tr><td id="td2">content2</td></tr>');
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        var $cell = $cont.find('#td1');
        var rng = range.create($cell[0].firstChild, 1);
        table.addRow(rng, 'bottom');

        var resultTable = $('<table><tbody><tr><td id="td1">content1</td></tr></tbody></table>');
        $(resultTable).append('<tr><td><br/></td></tr>');
        $(resultTable).append('<tr><td id="td2">content2</td></tr>');
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should add simple col to table on left between two cols', function () {
        var baseTable = $('<table><tbody></tbody></table>');
        var baseTr = '<tr><td id="td1">content1</td><td id="td2">content2</td></tr>';
        baseTable.append(baseTr);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        var $cell = $cont.find('#td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.addCol(rng, 'left');

        var resultTable = $('<table><tbody></tbody></table>');
        $(resultTable).append('<tr><td id="td1">content1</td><td><br/></td><td id="td2">content2</td></tr>');
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should add simple col to table on right between two cols', function () {
        var baseTable = $('<table><tbody></tbody></table>');
        var baseTr = '<tr><td id="td1">content1</td><td id="td2">content2</td></tr>';
        baseTable.append(baseTr);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        var $cell = $cont.find('#td1');
        var rng = range.create($cell[0].firstChild, 1);
        table.addCol(rng, 'right');

        var resultTable = $('<table><tbody></tbody></table>');
        $(resultTable).append('<tr><td id="td1">content1</td><td><br/></td><td id="td2">content2</td></tr>');
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete row to table between two other rows', function () {
        var baseTable = $('<table><tbody></tbody></table>');
        var baseTr = '<tr><td id="td1">content1</td></tr>';
        baseTr += '<td id="td2">content2</td></tr>';
        baseTr += '<td id="td3">content3</td></tr>';
        baseTable.append(baseTr);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        var $cell = $cont.find('#td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteRow(rng);

        var resultTable = $('<table><tbody></tbody></table>');
        $(resultTable).append('<tr><td id="td1">content1</td></tr><tr><td id="td3">content3</td></tr>');
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete col to table between two other cols', function () {
        var baseTable = $('<table><tbody></tbody></table>');
        var baseTr = '<tr><td id="td1">content1</td><td id="td2">content2</td><td id="td3">content3</td></tr>';
        baseTable.append(baseTr);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        var $cell = $cont.find('#td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteCol(rng);

        var resultTable = $('<table><tbody></tbody></table>');
        $(resultTable).append('<tr><td id="td1">content1</td><td id="td3">content3</td></tr>');
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete first col to table with colspan in column with colspan', function () {
        var baseTable = $('<table><tbody></tbody></table> ');
        var baseTr1 = '<tr><td colspan="2" id="tr1td1">Col1-Span</td><td id="tr1td2">Col2</td></tr>';
        var baseTr2 = '<tr><td id="tr2td1">Col1</td><td id="tr2td2">Col2</td><td id="tr2td3">Col3</td></tr>';
        baseTable.append(baseTr1);
        baseTable.append(baseTr2);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        
        var $cell = $cont.find('#tr1td1');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteCol(rng);

        var resultTable = $('<table><tbody></tbody></table> ');
        var resultTr1 = '<tr><td id="tr1td1"></td><td id="tr1td2">Col2</td></tr>';
        var resultTr2 = '<tr><td id="tr2td2">Col2</td><td id="tr2td3">Col3</td></tr>';
        resultTable.append(resultTr1);
        resultTable.append(resultTr2);
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete second col to table with colspan in column', function () {
        var baseTable = $('<table><tbody></tbody></table> ');
        var baseTr1 = '<tr><td colspan="2" id="tr1td1">Col1-Span</td><td id="tr1td2">Col2</td></tr>';
        var baseTr2 = '<tr><td id="tr2td1">Col1</td><td id="tr2td2">Col2</td><td id="tr2td3">Col3</td></tr>';
        baseTable.append(baseTr1);
        baseTable.append(baseTr2);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        
        var $cell = $cont.find('#tr2td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteCol(rng);

        var resultTable = $('<table><tbody></tbody></table> ');
        var resultTr1 = '<tr><td id="tr1td1">Col1-Span</td><td id="tr1td2">Col2</td></tr>';
        var resultTr2 = '<tr><td id="tr2td1">Col1</td><td id="tr2td3">Col3</td></tr>';
        resultTable.append(resultTr1);
        resultTable.append(resultTr2);
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete second col to table with colspan in 3 columns', function () {
        var baseTable = $('<table><tbody></tbody></table> ');
        var baseTr1 = '<tr><td colspan="3" id="tr1td1">Col1-Span</td><td id="tr1td4">Col4</td></tr>';
        var baseTr2 = '<tr><td id="tr2td1">Col1</td><td id="tr2td2">Col2</td><td id="tr2td3">Col3</td><td id="tr2td4">Col4</td></tr>';
        baseTable.append(baseTr1);
        baseTable.append(baseTr2);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        
        var $cell = $cont.find('#tr2td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteCol(rng);

        var resultTable = $('<table><tbody></tbody></table> ');
        var resultTr1 = '<tr><td colspan="2" id="tr1td1">Col1-Span</td><td id="tr1td4">Col4</td></tr>';
        var resultTr2 = '<tr><td id="tr2td1">Col1</td><td id="tr2td3">Col3</td><td id="tr2td4">Col4</td></tr>';
        resultTable.append(resultTr1);
        resultTable.append(resultTr2);
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete first row to table with rowspan in line with rowspan', function () {
        var baseTable = $('<table><tbody></tbody></table>');
        var baseTr1 = '<tr><td class="test" rowspan="2" id="tr1td1">Row1-Span</td><td id="tr1td2">Col2</td></tr>';
        var baseTr2 = '<tr><td id="tr2td2">Col2</td></tr>';
        var baseTr3 = '<tr><td id="tr3td1">Col1</td><td id="tr3td2">Col2</td></tr>';
        baseTable.append(baseTr1);
        baseTable.append(baseTr2);
        baseTable.append(baseTr3);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        
        var $cell = $cont.find('#tr1td1');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteRow(rng);

        var resultTable = $('<table><tbody></tbody></table> ');
        var resultTr1AndTr2 = '<tr><td class="test" id="tr1td1"></td><td id="tr2td2">Col2</td></tr>';
        var resultTr3 = '<tr><td id="tr3td1">Col1</td><td id="tr3td2">Col2</td></tr>';
        resultTable.append(resultTr1AndTr2);
        resultTable.append(resultTr3);
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

      it('should delete second row to table with rowspan in line without rowspan', function () {
        var baseTable = $('<table><tbody></tbody></table>');
        var baseTr1 = '<tr><td rowspan="3" id="tr1td1">Row1-Span</td><td id="tr1td2">Col2</td></tr>';
        var baseTr2 = '<tr><td id="tr2td2">Col2</td></tr>';
        var baseTr3 = '<tr><td id="tr3td2">Col2</td></tr>';
        var baseTr4 = '<tr><td id="tr4td1">Col1</td><td id="tr3td2">Col2</td></tr>';
        baseTable.append(baseTr1);
        baseTable.append(baseTr2);
        baseTable.append(baseTr3);
        baseTable.append(baseTr4);
        var htmlContent = '<div class="note-editable"><table>' + $(baseTable).html() + '</table></div>';
        var $cont = $(htmlContent);
        
        var $cell = $cont.find('#tr2td2');
        var rng = range.create($cell[0].firstChild, 1);
        table.deleteRow(rng);

        var resultTable = $('<table><tbody></tbody></table>');
        var resultTr1 = '<tr><td rowspan="2" id="tr1td1">Row1-Span</td><td id="tr1td2">Col2</td></tr>';
        var resultTr3 = '<tr><td id="tr3td2">Col2</td></tr>';
        var resultTr4 = '<tr><td id="tr4td1">Col1</td><td id="tr3td2">Col2</td></tr>';
        resultTable.append(resultTr1);
        resultTable.append(resultTr3);
        resultTable.append(resultTr4);
        var expectedResult = '<table>' + $(resultTable).html() + '</table>';

        expect(expectedResult).to.deep.equal($cont.html());
      });

    });
  });
});
