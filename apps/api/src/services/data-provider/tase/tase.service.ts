import { ConfigurationService } from '@ghostfolio/api/services/configuration/configuration.service';
import {
  DataProviderInterface,
  GetAssetProfileParams,
  GetDividendsParams,
  GetHistoricalParams,
  GetQuotesParams,
  GetSearchParams
} from '@ghostfolio/api/services/data-provider/interfaces/data-provider.interface';
import { DATE_FORMAT } from '@ghostfolio/common/helper';
import {
  DataProviderHistoricalResponse,
  DataProviderInfo,
  DataProviderResponse,
  LookupResponse
} from '@ghostfolio/common/interfaces';

import { Injectable, Logger } from '@nestjs/common';
import { DataSource, SymbolProfile } from '@prisma/client';
import { addDays, format, isSameDay } from 'date-fns';

@Injectable()
export class TaseService implements DataProviderInterface {
  private readonly TASE_API_BASE_URL = 'https://api.tase.co.il';

  public constructor(
    private readonly configurationService: ConfigurationService
  ) {}

  public canHandle(symbol: string): boolean {
    // TASE symbols typically end with .TA
    return symbol?.endsWith('.TA') || false;
  }

  public async getAssetProfile({
    symbol
  }: GetAssetProfileParams): Promise<Partial<SymbolProfile>> {
    try {
      // TODO: Implement TASE asset profile fetching
      // This would require calling the TASE API to get company information
      return {
        symbol,
        dataSource: this.getName()
      };
    } catch (error) {
      Logger.error(
        `Could not get asset profile for ${symbol} (${this.getName()}): [${error.name}] ${error.message}`,
        'TaseService'
      );
      return {};
    }
  }

  public getDataProviderInfo(): DataProviderInfo {
    return {
      dataSource: DataSource.TASE,
      isPremium: false,
      name: 'Tel Aviv Stock Exchange',
      url: 'https://www.tase.co.il'
    };
  }

  public async getDividends({
    from,
    symbol,
    to
  }: GetDividendsParams): Promise<{
    [date: string]: DataProviderHistoricalResponse;
  }> {
    try {
      // TODO: Implement TASE dividends fetching
      Logger.warn(
        `Dividends not yet implemented for ${symbol} (${this.getName()})`,
        'TaseService'
      );
      return {};
    } catch (error) {
      Logger.error(
        `Could not get dividends for ${symbol} (${this.getName()}) from ${format(
          from,
          DATE_FORMAT
        )} to ${format(to, DATE_FORMAT)}: [${error.name}] ${error.message}`,
        'TaseService'
      );
      return {};
    }
  }

  public async getHistorical({
    from,
    symbol,
    to
  }: GetHistoricalParams): Promise<{
    [symbol: string]: { [date: string]: DataProviderHistoricalResponse };
  }> {
    if (isSameDay(from, to)) {
      to = addDays(to, 1);
    }

    try {
      // TODO: Implement TASE historical data fetching
      // This would require calling the TASE API with proper authentication
      Logger.warn(
        `Historical data not yet implemented for ${symbol} (${this.getName()})`,
        'TaseService'
      );
      return {
        [symbol]: {}
      };
    } catch (error) {
      Logger.error(
        `Could not get historical market data for ${symbol} (${this.getName()}) from ${format(
          from,
          DATE_FORMAT
        )} to ${format(to, DATE_FORMAT)}: [${error.name}] ${error.message}`,
        'TaseService'
      );
      return {
        [symbol]: {}
      };
    }
  }

  public getName(): DataSource {
    return DataSource.TASE;
  }

  public async getQuotes({
    symbols
  }: GetQuotesParams): Promise<{ [symbol: string]: DataProviderResponse }> {
    const response: { [symbol: string]: DataProviderResponse } = {};

    if (symbols.length <= 0) {
      return response;
    }

    try {
      // TODO: Implement TASE real-time quotes fetching
      // This would require calling the TASE API to get current market data
      for (const symbol of symbols) {
        Logger.warn(
          `Quotes not yet implemented for ${symbol} (${this.getName()})`,
          'TaseService'
        );
      }

      return response;
    } catch (error) {
      Logger.error(error, 'TaseService');
      return {};
    }
  }

  public getTestSymbol(): string {
    // Example: Bank Hapoalim
    return 'POLI.TA';
  }

  public async search({
    query
  }: GetSearchParams): Promise<LookupResponse> {
    try {
      // TODO: Implement TASE search functionality
      // This would require calling the TASE API to search for securities
      Logger.warn(
        `Search not yet implemented for query "${query}" (${this.getName()})`,
        'TaseService'
      );
      return { items: [] };
    } catch (error) {
      Logger.error(error, 'TaseService');
      return { items: [] };
    }
  }
}
